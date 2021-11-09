namespace BGSales.Domain.Models
{
    public class StripeInfo : IEntity
    {
        public string Id { get; set; }
        public string StripeId { get; set; }
        public string UserId { get; set; }
        public bool IsCardAdded { get; set; }
    }
}
