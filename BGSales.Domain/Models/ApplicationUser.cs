using Microsoft.AspNetCore.Identity;

namespace BGSales.Domain.Models
{
    public class ApplicationUser : IdentityUser, IEntity
    {
        public RefreshToken RefreshToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
    }
}
