using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IOrderService
    {
        public Task CreateOrder(CreateOrderViewModel viewModel, string userId);
        public OrderViewModel GetOrderInfo(string orderId);
        public PartialOrderViewModel GetPartialOrderInfo(string orderId);
    }
}
