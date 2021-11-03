using BGSales.Domain.Models;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBloggerService
    {
        public Task CreateBlogger(ApplicationUser user);
    }
}
