using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IMessageService
    {
        public Task<MessageViewModel> SendMessage(SendMessageViewModel model);
    }
}
