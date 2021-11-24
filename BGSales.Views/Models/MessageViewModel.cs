using System;

namespace BGSales.Views.Models
{
    public class MessageViewModel
    {
        public string SenderUserId { get; set; }
        public string Text { get; set; }
        public DateTime TimeSent { get; set; }
        public string ChatId { get; set; }
    }
}
