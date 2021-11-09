using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class ApplicationUser : IdentityUser, IEntity
    {
        public RefreshToken RefreshToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
