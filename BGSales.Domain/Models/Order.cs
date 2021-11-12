using System;

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
    }
}
