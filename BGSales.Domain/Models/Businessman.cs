using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Collections.Generic;

namespace BGSales.Domain.Models
{
    public class Businessman : IEntity
    {
        public Businessman()
        {

        }

        public Businessman(ILazyLoader lazyLoader)
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
        public string CompanyName { get; set; }
        public virtual List<Order> Orders { get; set; }
        public virtual List<Chat> Chats { get; set; }
    }
}
