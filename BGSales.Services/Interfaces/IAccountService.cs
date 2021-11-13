using BGSales.Domain.Models;
using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IAccountService
    {
        public Task<ApplicationUser> GetByEmail(string email);
        public Task<ApplicationUser> GetById(string userId);
        public bool VerifyUser(ApplicationUser user, string password);
        public Task<ApplicationUser> CreateUser(RegistrationViewModel model);
        public Task<bool> UpdateUser(ApplicationUser user);
        public Task<BloggerViewModel> UpdateBlogger(UpdateBloggerViewModel model, string rootPath);
        public Task<BusinessmanViewModel> UpdateBusinessman(UpdateBusinessmanViewModel model, string rootPath);
    }
}
