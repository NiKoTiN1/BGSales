using BGSales.Views.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IOrderService
    {
        public Task CreateOrder(CreateOrderViewModel viewModel, string userId);
        public OrderViewModel GetOrderInfo(string orderId);
        public List<PartialOrderViewModel> GetAllBusinessmanOrders(string userId);
        public Task<OrderViewModel> UpdateOrder(UpdateOrderViewModel model, string userId);
        public Task DeleteOrder(string orderId, string userId);
        public Task RequestOrder(RequestOrderViewModel viewModel);
    }
}
