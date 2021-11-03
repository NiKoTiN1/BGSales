using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class BloggerRepository : BaseRepository<Blogger>, IBloggerRepository
    {
        public BloggerRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
