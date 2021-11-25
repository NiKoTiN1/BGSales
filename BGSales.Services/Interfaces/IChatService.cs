using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IChatService
    {
        public Task<string> CreateChat(CreateChatViewModel model);
        public ChatViewModel GetChat(string chatId);
    }
}
