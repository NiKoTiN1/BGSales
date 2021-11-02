using System;

namespace BGSales.Domain.Models
{
    public class RefreshToken : IEntity
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
