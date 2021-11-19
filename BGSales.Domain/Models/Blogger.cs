using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class Blogger : IEntity
    {
        public Blogger()
        {

        }

        public Blogger(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }

        private readonly ILazyLoader _lazyLoader;

        private ApplicationUser user;

        public ApplicationUser User
        {
            get => _lazyLoader.Load(this, ref user);
            set => user = value;
        }
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Nickname { get; set; }
        public string UrlInstagram { get; set; }
        public string UrlTwitch { get; set; }
        public string UrlYouTube { get; set; }
        public string UrlTickTok { get; set; }
        public string Activity { get; set; }
        public string Subjects { get; set; }
        public int Subscribers { get; set; }
        public int AgeAudience { get; set; }
        public int BloggerExperience { get; set; }
        public virtual List<Chat> Chats { get; set; }
        public virtual List<Order> Orders { get; set; }
        public virtual List<Order> RequestedOrders { get; set; }
    }
}
