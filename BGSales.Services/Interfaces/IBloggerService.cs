using BGSales.Domain.Models;
using BGSales.Views.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBloggerService
    {
        public Task CreateBlogger(ApplicationUser user);
        public BloggerViewModel Get(ApplicationUser user);
        public Blogger GetByUserId(string userId);
        public List<BloggerViewModel> GetAllBloggers();
        public Task<BloggerViewModel> Update(UpdateBloggerViewModel model);
    }
}
