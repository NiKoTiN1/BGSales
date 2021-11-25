using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class ChatRepository : BaseRepository<Chat>, IChatRepository
    {
        public ChatRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
