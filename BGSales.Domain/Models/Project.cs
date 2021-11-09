using System;

namespace BGSales.Domain.Models
{
    public class Project : IEntity
    {
        public string Id { get; set; }
        public Order Order { get; set; }
        public string OrderId { get; set; }
        public Blogger Blogger { get; set; }
        public string BloggerId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
