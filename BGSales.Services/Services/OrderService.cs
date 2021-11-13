using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class OrderService : IOrderService
    {
        public OrderService(IOrderRepository orderRepository,
            IMapper mapper,
            IBusinessmanService businessmanService,
            IAccountService accountService)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _businessmanService = businessmanService;
            _accountService = accountService;
        }

        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IBusinessmanService _businessmanService;
        private readonly IAccountService _accountService;

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
            var order = _orderRepository.Get(o => o.Id == orderId).SingleOrDefault();

            if (order == null)
            {
                throw new Exception("Cannot find this order");
            }

            var model = _mapper.Map<OrderViewModel>(order);
            var businessman = _businessmanService.GetByBusinessmanId(order.AdvertiserId);
            var businessmanModel = _mapper.Map<BusinessmanViewModel>(businessman.User);
            businessmanModel = _mapper.Map(businessman, businessmanModel);

            model.Advitiser = businessmanModel;

            return model;
        }

        public PartialOrderViewModel GetPartialOrderInfo(string orderId)
        {
            var fullInfo = GetOrderInfo(orderId);
            var model = _mapper.Map<PartialOrderViewModel>(fullInfo);
            return model;
        }
    }
}
