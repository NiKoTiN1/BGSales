using BGSales.Domain.Models;
using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBusinessmanService
    {
        public Task<ApplicationUser> CreateBusinessman(RegistrationViewModel model);
        public BusinessmanViewModel Get(ApplicationUser user);
        public Businessman GetByUserId(string userId);
        public Businessman GetByBusinessmanId(string id);
        public Task<BusinessmanViewModel> Update(UpdateBusinessmanViewModel model, string rootPath);
    }
}
