using BGSales.Domain.Models;
using BGSales.Services.Dtos.User;
using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IAccountService
    {
        public Task<TokenViewModel> GenerateToken(ApplicationUser user);
        public Task<ApplicationUser> GetByEmail(string email);
        public Task<ApplicationUser> GetById(string userId);
        public bool VerifyUser(ApplicationUser user, string password);
        public Task<ApplicationUser> CreateUser(RegistrationDto registrationDto);
        public Task<bool> UpdateUser(ApplicationUser user);
        public Task<bool> IsInRole(ApplicationUser user, Roles role);
        public Task<bool> IsAdmin(string userId);
    }
}
