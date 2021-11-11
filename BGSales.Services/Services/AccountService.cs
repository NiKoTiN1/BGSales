using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class AccountService : IAccountService
    {
        public AccountService(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IBusinessmanService businessmanService,
            IBloggerService bloggerService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _businessmanService = businessmanService;
            _bloggerService = bloggerService;
        }

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IBusinessmanService _businessmanService;
        private readonly IBloggerService _bloggerService;

        public async Task<ApplicationUser> GetByEmail(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<ApplicationUser> GetById(string userId)
        {
            return await _userManager.FindByIdAsync(userId).ConfigureAwait(false);
        }

        public bool VerifyUser(ApplicationUser user, string password)
        {
            if (user == null)
            {
                return false;
            }

            return _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password) == PasswordVerificationResult.Success;
        }

        public async Task<ApplicationUser> CreateUser(RegistrationViewModel model)
        {
            var user = _mapper.Map<ApplicationUser>(model);

            var creatingResult = await _userManager.CreateAsync(user, model.Password);

            if (!creatingResult.Succeeded)
            {
                return null;
            }

            try
            {
                if (user.UserType == UserType.Blogger)
                {
                    await _bloggerService.CreateBlogger(user);
                    await AddRoleToUser(user, Roles.Blogger);
                }
                else
                {
                    await _businessmanService.CreateBusinessman(user);
                    await AddRoleToUser(user, Roles.Businessman);
                }
            }
            catch
            {
                await _userManager.DeleteAsync(user);
            }

            return user;
        }

        public async Task<bool> UpdateUser(ApplicationUser user)
        {
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        private async Task AddRoleToUser(ApplicationUser user, Roles role)
        {
            var result = await _userManager.AddToRoleAsync(user, role.ToString()).ConfigureAwait(false);
            await _userManager.UpdateSecurityStampAsync(user).ConfigureAwait(false);
            if (!result.Succeeded)
            {
                throw new Exception("Cannot set role to user!");
            }
        }
    }
}
