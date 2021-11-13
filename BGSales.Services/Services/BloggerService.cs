using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Linq;
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

        public BloggerViewModel Get(ApplicationUser user)
        {
            var blogger = _bloggerRepository.Get(b => b.UserId == user.Id).SingleOrDefault();

            if (blogger == null)
            {
                throw new System.Exception("Cannot find blogger with this Id!");
            }

            var model = _mapper.Map<BloggerViewModel>(user);
            model = _mapper.Map(blogger, model);

            return model;
        }

        public async Task<BloggerViewModel> Update(UpdateBloggerViewModel model)
        {
            var blogger = _bloggerRepository.Get(b => b.UserId == model.UserId).SingleOrDefault();

            if (blogger == null)
            {
                throw new System.Exception("Cannot find blogger with this Id!");
            }

            blogger = _mapper.Map(model, blogger);

            try
            {
                await _bloggerRepository.Update(blogger);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            var updatedModel = _mapper.Map<BloggerViewModel>(blogger);

            return updatedModel;
        }
    }
}
