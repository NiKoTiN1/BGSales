using BGSales.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BGSales.Data
{
    public partial class BGSStagingContext : IdentityDbContext<ApplicationUser>
    {
        public BGSStagingContext()
        {
        }

        public BGSStagingContext(DbContextOptions<BGSStagingContext> options)
            : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=rodion-HP-ProBook-450-G5,1433;Database=BGS-Staging;MultipleActiveResultSets=true;User id=sa;Password=Z-omby111222;");
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-IHNU5NF\\SQLEXPRESS;Database=BGS-Staging;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
