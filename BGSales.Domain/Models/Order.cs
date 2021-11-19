using System;
using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class Order : IEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int AudienceAge { get; set; }
        public string Description { get; set; }
        public Businessman Advertiser { get; set; }
        public string AdvertiserId { get; set; }
        public double Budget { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public Blogger Blogger { get; set; }
        public string BloggerId { get; set; }
        public virtual List<Blogger> BloggerRequests { get; set; }
    }
}
