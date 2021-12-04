using System;

namespace BGSales.Views.Models
{
    public class MessageViewModel
    {
        public string MessageId { get; set; }
        public string SenderUserId { get; set; }
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
    }
}
