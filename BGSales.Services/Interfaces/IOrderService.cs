using BGSales.Views.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IOrderService
    {
        public Task CreateOrder(CreateOrderViewModel viewModel, string userId);
        public OrderViewModel GetOrderInfo(string orderId, string currentUserId);
        public List<PartialOrderViewModel> GetAllBusinessmanOrders(string userId);
        public List<PartialOrderViewModel> GetAllAvailablePartialOrders(string userId, string searchString);
        public List<PartialOrderViewModel> GetAllRequestedPartialOrders(string userId, string searchString);
        public Task<List<PartialOrderViewModel>> GetAcceptedBloggerOrders(string userId, string searchString);
        public Task<OrderViewModel> UpdateOrder(UpdateOrderViewModel model, string userId);
        public Task AcceptOrder(AcceptOrderViewModel model);
        public Task DeleteOrder(string orderId, string userId);
        public Task RequestOrder(RequestOrderViewModel viewModel);
        public Task SetOrderPaymentIntent(string orderId, string paymentIntentId);
        public Task SetOrderPayed(string orderId);
    }
}
