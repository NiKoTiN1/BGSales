using BGSales.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BGSales.Data
{
    public partial class BGSStagingContext : IdentityDbContext<ApplicationUser>
    {
        public BGSStagingContext(DbContextOptions<BGSStagingContext> options)
            : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Blogger> Bloggers { get; set; }
        public DbSet<Businessman> Businessmans { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Chat> Chat { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<StripeInfo> StripeInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");


            modelBuilder
                .Entity<ApplicationUser>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Owner)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<Blogger>()
                .HasMany(e => e.Orders)
                .WithMany(e => e.BloggerRequests);

            modelBuilder
                .Entity<Blogger>()
                .HasMany(e => e.RequestedOrders)
                .WithOne(e => e.Blogger)
                .HasForeignKey("BloggerId")
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<Order>()
                .HasOne(e => e.Blogger)
                .WithMany(e => e.RequestedOrders)
                .OnDelete(DeleteBehavior.SetNull);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
