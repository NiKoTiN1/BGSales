using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class OrderService : IOrderService
    {
        public OrderService(IOrderRepository orderRepository,
            IMapper mapper,
            IBusinessmanService businessmanService,
            IBloggerService bloggerService,
            IAccountService accountService,
            IChatService chatService,
            IStripeService stripeService)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _businessmanService = businessmanService;
            _accountService = accountService;
            _bloggerService = bloggerService;
            _chatService = chatService;
            _stripeService = stripeService;
        }

        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IBusinessmanService _businessmanService;
        private readonly IAccountService _accountService;
        private readonly IBloggerService _bloggerService;
        private readonly IChatService _chatService;
        private readonly IStripeService _stripeService;

        public async Task CreateOrder(CreateOrderViewModel viewModel, string userId)
        {
            var user = await _accountService.GetById(userId);
            var businessman = _businessmanService.GetByUserId(user.Id);

            if (!await _accountService.IsInRole(user, Roles.Businessman))
            {
                throw new Exception("You have no permission to create order");
            }

            var order = _mapper.Map<Order>(viewModel);
            order.AdvertiserId = businessman.Id;

            try
            {
                await _orderRepository.Add(order);
            }
            catch
            {
                throw new Exception("Error during creating order in DB");
            }
        }

        public OrderViewModel GetOrderInfo(string orderId, string currentUserId)
        {
            var order = _orderRepository.Get(o => o.Id == orderId, new[] { "Blogger", "BloggerRequests", "Advertiser" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find this order");
            }

            var model = _mapper.Map<OrderViewModel>(order);

            if (currentUserId == order.Advertiser.UserId)
            {
                if (order.Blogger != null)
                {
                    model.ChatId = _chatService.GetChatId(order.BloggerId, order.AdvertiserId);
                }
            }
            else
            {
                try
                {
                    var blogger = _bloggerService.GetByUserId(currentUserId);
                    model.ChatId = _chatService.GetChatId(blogger.Id, order.AdvertiserId);
                    model.StripeId = string.Empty;
                }
                catch
                {
                    throw new Exception("You cannot see this order");
                }
            }

            return model;
        }

        public List<PartialOrderViewModel> GetAllBusinessmanOrders(string userId)
        {
            var businessman = _businessmanService.GetByUserId(userId);
            var orders = _orderRepository.Get(o => o.AdvertiserId == businessman.Id, new[] { "Blogger", "BloggerRequests" })
                .ToList();
            return orders.Select(o => _mapper.Map<PartialOrderViewModel>(o)).ToList();
        }

        public List<PartialOrderViewModel> GetAllAvailablePartialOrders(string userId, string searchString)
        {
            var orders = _orderRepository.Get(o => string.IsNullOrEmpty(o.BloggerId), new[] { "BloggerRequests", "Advertiser" })
                .ToList();
            var availableOrders = orders.Where(o => o.BloggerRequests.All(b => b.UserId != userId));

            if(searchString != null)
            {
                availableOrders = SearchOrders(availableOrders, searchString);
            }

            return availableOrders.Select(o => _mapper.Map<PartialOrderViewModel>(o)).ToList();
        }

        public List<PartialOrderViewModel> GetAllRequestedPartialOrders(string userId, string searchString)
        {
            var orders = _orderRepository.Get(o => string.IsNullOrEmpty(o.BloggerId), new[] { "BloggerRequests", "Advertiser" })
                .ToList();
            var availableOrders = orders.Where(o => o.BloggerRequests.Any(b => b.UserId == userId));

            if (searchString != null)
            {
                availableOrders = SearchOrders(availableOrders, searchString);
            }

            return availableOrders.Select(o => _mapper.Map<PartialOrderViewModel>(o)).ToList();
        }

        public async Task<List<PartialOrderViewModel>> GetAcceptedBloggerOrders(string userId, string searchString)
        {
            var user = await _accountService.GetById(userId);
            var isBlogger = await _accountService.IsInRole(user, Roles.Blogger);

            if (!isBlogger)
            {
                throw new Exception("You should be blogger to see this info");
            }

            var orders = _orderRepository.Get(o => o.Blogger.UserId == userId, new[] { "Blogger", "Advertiser" })
                .ToList();

            if (searchString != null)
            {
                orders = SearchOrders(orders, searchString);
            }

            var orderModels = _mapper.Map<List<PartialOrderViewModel>>(orders);
            return orderModels;
        }

        public async Task<OrderViewModel> UpdateOrder(UpdateOrderViewModel model, string userId)
        {
            var order = _orderRepository.Get(o => o.Id == model.OrderId, new[] { "Advertiser" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find order with this Id");
            }

            if (order.Advertiser.UserId != userId)
            {
                throw new Exception("You have no permission to update this order");
            }

            var updatedOrder = _mapper.Map(model, order);

            await _orderRepository.Update(updatedOrder);

            var updatedVeiwModel = _mapper.Map<OrderViewModel>(updatedOrder);

            return updatedVeiwModel;
        }

        public async Task AcceptOrder(AcceptOrderViewModel model)
        {
            var order = _orderRepository.Get(o => o.Id == model.OrderId, new[] { "Advertiser", "BloggerRequests" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find order with this Id");
            }

            if (order.Advertiser.UserId != model.BusinessmanUserId)
            {
                throw new Exception("You have no permission to work with this order");
            }

            if (!string.IsNullOrEmpty(order.BloggerId))
            {
                throw new Exception("This order is accepted");
            }

            var blogger = order.BloggerRequests.SingleOrDefault(b => b.UserId == model.BloggerUserId);

            if (blogger == null)
            {
                throw new Exception("This blogger have to request before");
            }

            order.BloggerRequests = new List<Blogger>();
            order.BloggerId = blogger.Id;

            var productId = _stripeService.CreateProduct(order.Name);
            var priceId = _stripeService.CreatePrice(productId, Convert.ToInt64(order.Budget * 100));

            order.StripeId = priceId;

            await _orderRepository.Update(order);
        }

        public async Task DeleteOrder(string orderId, string userId)
        {
            var order = _orderRepository.Get(o => o.Id == orderId, new[] { "Advertiser" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find order with this Id");
            }

            if (order.Advertiser.UserId != userId)
            {
                throw new Exception("You have no permission to update this order");
            }

            await _orderRepository.Remove(order);
        }

        public async Task RequestOrder(RequestOrderViewModel viewModel)
        {
            var order = _orderRepository.Get(o => o.Id == viewModel.OrderId, new[] { "Advertiser", "Blogger", "BloggerRequests" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find order with this Id");
            }

            if (order.Blogger != null)
            {
                throw new Exception("This order already acepted");
            }

            var isBloggerRequested = order.BloggerRequests.SingleOrDefault(br => br.UserId == viewModel.UserId) != null;

            if (isBloggerRequested)
            {
                throw new Exception("You cannot request this project one more time");
            }

            var blogger = _bloggerService.GetByUserId(viewModel.UserId);

            order.BloggerRequests.Add(blogger);

            await _orderRepository.Update(order);
        }

        public async Task SetOrderPaymentIntent(string orderId, string paymentIntentId)
        {
            var order = _orderRepository.Get(o => o.Id == orderId).SingleOrDefault();

            order.PaymentIntentId = paymentIntentId;

            await _orderRepository.Update(order);
        }

        public async Task SetOrderPayed(string paymentIntentId)
        {
            var order = _orderRepository.Get(o => o.PaymentIntentId == paymentIntentId).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find order with this Id");
            }

            order.IsPaid = true;

            await _orderRepository.Update(order);
        }

        private List<Order> SearchOrders(IEnumerable<Order> orders, string searchString)
        {
            var found = orders.Where(o => o.Name.ToLower().Contains(searchString.ToLower())).ToList();
            return found;
        }
    }
}
