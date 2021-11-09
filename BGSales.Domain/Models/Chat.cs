using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class Chat : IEntity
    {
        public string Id { get; set; }
        public Blogger Blogger { get; set; }
        public string BloggerId { get; set; }
        public Businessman Businessman { get; set; }
        public string BusinessmanId { get; set; }
        public List<Message> Messages { get; set; }
    }
}
