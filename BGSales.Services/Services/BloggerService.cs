using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class BloggerService : IBloggerService
    {
        public BloggerService(IBloggerRepository bloggerRepository,
            IMapper mapper)
        {
            _bloggerRepository = bloggerRepository;
            _mapper = mapper;
        }

        private readonly IBloggerRepository _bloggerRepository;
        private readonly IMapper _mapper;

        public async Task CreateBlogger(ApplicationUser user)
        {
            var blogger = _mapper.Map<Blogger>(user);

            await _bloggerRepository.Add(blogger);
        }
    }
}
