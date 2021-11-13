using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class ImageRepository : BaseRepository<Image>, IImageRepository
    {
        public ImageRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
