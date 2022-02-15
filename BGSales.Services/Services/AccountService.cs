using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Dtos.User;
using BGSales.Services.Interfaces;
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
            IBloggerService bloggerService,
            IImageService imageService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _businessmanService = businessmanService;
            _bloggerService = bloggerService;
            _imageService = imageService;
        }

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IBusinessmanService _businessmanService;
        private readonly IBloggerService _bloggerService;
        private readonly IImageService _imageService;

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

        public async Task<ApplicationUser> CreateUser(RegistrationDto registrationDto)
        {
            var user = _mapper.Map<ApplicationUser>(registrationDto);
            var creatingResult = await _userManager.CreateAsync(user, registrationDto.Model.Password);

            if (!creatingResult.Succeeded)
            {
                return null;
            }

            try
            {
                var role = user.UserType == UserType.Blogger
                    ? Roles.Blogger
                    : Roles.Businessman;

                await AddRoleToUser(user, role);
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

        public async Task<bool> IsInRole(ApplicationUser user, Roles role)
        {
            return await _userManager.IsInRoleAsync(user, role.ToString());
        }

        public async Task<bool> IsAdmin(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return await _userManager.IsInRoleAsync(user, Roles.Admin.ToString());
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
