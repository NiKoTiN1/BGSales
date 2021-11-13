using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        public OrderRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
