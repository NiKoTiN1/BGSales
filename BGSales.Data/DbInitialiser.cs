using BGSales.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Data
{
    public class DbInitializer
    {
        public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (roleManager.Roles.Any())
            {
                return;
            }

            await roleManager.CreateAsync(new IdentityRole(Enum.GetName(typeof(Roles), Roles.Admin))).ConfigureAwait(false);
            await roleManager.CreateAsync(new IdentityRole(Enum.GetName(typeof(Roles), Roles.Blogger))).ConfigureAwait(false);
            await roleManager.CreateAsync(new IdentityRole(Enum.GetName(typeof(Roles), Roles.Businessman))).ConfigureAwait(false);
        }

        public static async Task SeedAdmin(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            if (userManager.Users.Any())
            {
                return;
            }

            var admin = new ApplicationUser
            {
                Email = configuration["DBInitialize:Admin:Email"],
                UserName = configuration["DBInitialize:Admin:Email"],
            };

            await userManager.CreateAsync(admin, configuration["DBInitialize:Admin:Password"]).ConfigureAwait(false);
            await userManager.AddToRoleAsync(admin, Enum.GetName(typeof(Roles), Roles.Admin)).ConfigureAwait(false);
        }
    }
}
