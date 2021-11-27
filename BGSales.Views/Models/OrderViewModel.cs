using System;
using System.Collections.Generic;

namespace BGSales.Views.Models
{
    public class OrderViewModel
    {
        public string OrderId { get; set; }
        public string Title { get; set; }
        public int AudienceAge { get; set; }
        public string Description { get; set; }
        public double Budget { get; set; }
        public DateTime CreateDate { get; set; }
        public BusinessmanViewModel Advitiser { get; set; }
        public BloggerPartialViewModel Blogger { get; set; }
        public virtual List<BloggerPartialViewModel> BloggerRequests { get; set; }
    }
}
