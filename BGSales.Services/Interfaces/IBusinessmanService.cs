using BGSales.Domain.Models;
using BGSales.Views.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBusinessmanService
    {
        public Task CreateBusinessman(ApplicationUser user);
        public BusinessmanViewModel Get(ApplicationUser user);
        public Businessman GetByUserId(string userId);
        public Task<BusinessmanViewModel> Update(UpdateBusinessmanViewModel model);
    }
}
