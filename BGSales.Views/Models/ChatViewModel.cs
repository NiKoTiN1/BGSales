using System.Collections.Generic;

namespace BGSales.Views.Models
{
    public class ChatViewModel
    {
        public string ChatId { get; set; }
        public UserViewModel RecivierInfo { get; set; }
        public List<MessageViewModel> Messages { get; set; }
    }
}
