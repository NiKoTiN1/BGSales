using BGSales.Data.Interfaces;
using BGSales.Domain.Models;

namespace BGSales.Data.Repositories
{
    public class MessageRepository : BaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(BGSStagingContext context)
            : base(context)
        {

        }
    }
}
