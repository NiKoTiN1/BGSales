using System;

namespace BGSales.Domain.Models
{
    public class Message : IEntity
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public ApplicationUser Sender { get; set; }
        public string SenderId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
