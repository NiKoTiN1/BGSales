namespace BGSales.Domain.Models
{
    public class Project : IEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int AudienceAge { get; set; }
        public string Description { get; set; }
    }
}
