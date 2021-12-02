using System.Collections.Generic;

namespace BGSales.Views.Models
{
    public class ChatViewModel
    {
        public string ChatId { get; set; }
        public BusinessmanViewModel Businessman { get; set; }
        public BloggerViewModel Blogger { get; set; }
        public List<MessageViewModel> Messages { get; set; }
    }
}
