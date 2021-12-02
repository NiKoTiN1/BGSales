using BGSales.Views.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IMessageService
    {
        public Task<MessageViewModel> SendMessage(SendMessageViewModel model);
        public List<MessageViewModel> GetChatMessages(string chatId, string currentUserId);
    }
}
