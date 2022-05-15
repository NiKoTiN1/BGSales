using BGSales.Domain.Models;
using BGSales.Views.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IBloggerService
    {
        public Task<ApplicationUser> CreateBlogger(RegistrationViewModel model);
        public BloggerViewModel Get(ApplicationUser user);
        public Blogger GetByUserId(string userId);
        public List<BloggerPartialViewModel> GetAllBloggers(string searchString);
        public Task<BloggerViewModel> Update(UpdateBloggerViewModel model, string rootPath);
    }
}
