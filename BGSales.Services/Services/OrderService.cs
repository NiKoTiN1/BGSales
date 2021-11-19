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
            IAccountService accountService)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _businessmanService = businessmanService;
            _accountService = accountService;
            _bloggerService = bloggerService;
        }

        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IBusinessmanService _businessmanService;
        private readonly IAccountService _accountService;
        private readonly IBloggerService _bloggerService;

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

        public OrderViewModel GetOrderInfo(string orderId)
        {
            var order = _orderRepository.Get(o => o.Id == orderId, new[] { "Blogger", "BloggerRequests" }).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find this order");
            }

            var model = _mapper.Map<OrderViewModel>(order);
            var businessman = _businessmanService.GetByBusinessmanId(order.AdvertiserId);
            var businessmanModel = _mapper.Map<BusinessmanViewModel>(businessman.User);
            businessmanModel = _mapper.Map(businessman, businessmanModel);

            model.Advitiser = businessmanModel;

            if (order.Blogger == null)
            {
                var requestedBloggers = new List<BloggerViewModel>();
                foreach (var blogger in order.BloggerRequests)
                {
                    var userModel = _mapper.Map<BloggerViewModel>(blogger.User);
                    var bloggerModel = _mapper.Map(blogger, userModel);
                    requestedBloggers.Add(bloggerModel);
                }
                model.BloggerRequests = requestedBloggers;
            }
            else
            {
                var userModel = _mapper.Map<BloggerViewModel>(order.Blogger.User);
                var bloggerModel = _mapper.Map(order.Blogger, userModel);
                model.Blogger = bloggerModel;
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

            var businessmanModel = _mapper.Map<BusinessmanViewModel>(order.Advertiser.User);
            businessmanModel = _mapper.Map(order.Advertiser, businessmanModel);
            updatedVeiwModel.Advitiser = businessmanModel;

            return updatedVeiwModel;
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
    }
}
