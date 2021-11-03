using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class RefreshTokenRepository : BaseRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
