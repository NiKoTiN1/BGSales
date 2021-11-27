namespace BGSales.Views.Models
{
    public class PartialOrderViewModel
    {
        public string OrderId { get; set; }
        public string CompanyName { get; set; }
        public string Title { get; set; }
        public double Budget { get; set; }
        public int Requests { get; set; }
        public bool IsAccepted { get; set; }
    }
}
