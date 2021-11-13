using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
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
    }
}
