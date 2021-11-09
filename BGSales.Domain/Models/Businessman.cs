namespace BGSales.Domain.Models
{
    public class Businessman : IEntity
    {
        public string Id { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
        public string CompanyName { get; set; }
        public Image Avatar { get; set; }
        public string AvatarId { get; set; }
    }
}
