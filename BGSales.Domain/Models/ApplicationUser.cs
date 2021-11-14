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

        private StripeInfo stripeInfo;
        public StripeInfo StripeInfo
        {
            get => _lazyLoader.Load(this, ref stripeInfo);
            set => stripeInfo = value;
        }

        private Image avatar;
        public Image Avatar
        {
            get => _lazyLoader.Load(this, ref avatar);
            set => avatar = value;
        }
        public string AvatarId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
