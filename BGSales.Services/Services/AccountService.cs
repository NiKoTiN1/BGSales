using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Dtos.User;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountService(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public async Task<TokenViewModel> GenerateToken(ApplicationUser user)
        {
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            var isUpdated = await UpdateUser(user);

            if (!isUpdated)
            {
                throw new Exception("User cannot set refresh error!");
            }

            var tokenModel = _mapper.Map<TokenViewModel>(user.RefreshToken);
            tokenModel.AccessToken = await _tokenService.GenerateToken(user);
            return tokenModel;
        }

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
