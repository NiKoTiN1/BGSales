using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class ApplicationUser : IdentityUser, IEntity
    {
        public ApplicationUser()
        {

        }

        public ApplicationUser(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }

        private readonly ILazyLoader _lazyLoader;

        private RefreshToken refreshToken;

        public RefreshToken RefreshToken
        {
            get => _lazyLoader.Load(this, ref refreshToken);
            set => refreshToken = value;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public List<Comment> Comments { get; set; }
        public StripeInfo StripeInfo { get; set; }
        public Image Avatar { get; set; }
        public string AvatarId { get; set; }
    }
}
