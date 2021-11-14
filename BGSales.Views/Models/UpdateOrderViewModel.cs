using System;

namespace BGSales.Views.Models
{
    public class UpdateOrderViewModel
    {
        public string OrderId { get; set; }
        public string Title { get; set; }
        public int AudienceAge { get; set; }
        public string Description { get; set; }
        public double Budget { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
