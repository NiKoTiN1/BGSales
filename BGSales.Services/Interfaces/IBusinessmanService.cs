using BGSales.Domain.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBusinessmanService
    {
        public Task CreateBusinessman(ApplicationUser user);
    }
}
