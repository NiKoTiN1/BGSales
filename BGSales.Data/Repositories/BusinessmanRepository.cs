using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class BusinessmanRepository : BaseRepository<Businessman>, IBusinessmanRepository
    {
        public BusinessmanRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
