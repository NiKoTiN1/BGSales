using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BGSales.Web.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessage1(string userId, string message)
        {
            return Clients.User(userId).SendAsync("ReceiveOne", userId, message);
        }
    }
}
