using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class AccountService : IAccountService
    {
        public AccountService(
            UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public async Task<ApplicationUser> GetByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }

        public async Task<ApplicationUser> GetById(string userId)
        {
            return await userManager.FindByIdAsync(userId).ConfigureAwait(false);
        }

        public bool VerifyUser(ApplicationUser user, string password)
        {
            if (user == null)
            {
                return false;
            }

            return userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password) == PasswordVerificationResult.Success;
        }

        public async Task<ApplicationUser> CreateUser(RegistrationViewModel model)
        {
            ApplicationUser user = mapper.Map<ApplicationUser>(model);

            IdentityResult test = await userManager.CreateAsync(user, model.Password);

            if (!test.Succeeded)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> UpdateUser(ApplicationUser user)
        {
            IdentityResult result = await userManager.UpdateAsync(user);
            return result.Succeeded;
        }
    }
}
