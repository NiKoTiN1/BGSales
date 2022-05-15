using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Dtos.User;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class BloggerService : IBloggerService
    {
        public BloggerService(IBloggerRepository bloggerRepository,
            IAccountService accountService,
            IImageService imageService,
            IMapper mapper)
        {
            _bloggerRepository = bloggerRepository;
            _accountService = accountService;
            _imageService = imageService;
            _mapper = mapper;
        }

        private readonly IBloggerRepository _bloggerRepository;
        private readonly IAccountService _accountService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public async Task<ApplicationUser> CreateBlogger(RegistrationViewModel model)
        {
            var registrationDto = new RegistrationDto()
            {
                UserId = Guid.NewGuid().ToString(),
                Model = model,
                UserType = UserType.Blogger
            };
            var user = await _accountService.CreateUser(registrationDto);
            var blogger = _mapper.Map<Blogger>(user);

            await _bloggerRepository.Add(blogger);

            return user;
        }

        public BloggerViewModel Get(ApplicationUser user)
        {
            var blogger = _bloggerRepository.Get(b => b.UserId == user.Id).SingleOrDefault();

            if (blogger == null)
            {
                throw new System.Exception("Cannot find blogger with this Id!");
            }

            var model = _mapper.Map<BloggerViewModel>(blogger);

            return model;
        }

        public Blogger GetByUserId(string userId)
        {
            var blogger = _bloggerRepository.Get(b => b.UserId == userId).SingleOrDefault();

            if (blogger == null)
            {
                throw new System.Exception("Cannot find blogger with this Id!");
            }

            return blogger;
        }

        public List<BloggerPartialViewModel> GetAllBloggers(string searchString)
        {
            var bloggers = _bloggerRepository.Get(b => true).ToList();

            if(searchString != null)
            {
                bloggers = SearchBloggers(bloggers, searchString);
            }

            if (bloggers.Count == 0)
            {
                throw new System.Exception("There is no bloggers");
            }

            var bloggerModels = _mapper.Map<List<BloggerPartialViewModel>>(bloggers);

            return bloggerModels;
        }

        public async Task<BloggerViewModel> Update(UpdateBloggerViewModel model, string rootPath)
        {
            var user = await _accountService.GetById(model.UserId);

            if (user == null)
            {
                throw new Exception("Cannot find user!");
            }

            var updatedUser = _mapper.Map(model, user);

            if (model.ImageFile != null)
            {
                var image = await _imageService.CreateImage(rootPath, model.ImageFile);
                updatedUser.AvatarId = image.Id;
            }

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

            var userUpdateResult = await _accountService.UpdateUser(user);

            if (!userUpdateResult)
            {
                throw new Exception("Error during user update.");
            }

            var updatedModel = _mapper.Map<BloggerViewModel>(blogger);

            return updatedModel;
        }

        private List<Blogger> SearchBloggers(IEnumerable<Blogger> bloggers, string searchString)
        {
            var found = bloggers.Where(b => b.User.FirstName.ToLower().Contains(searchString.ToLower()) || b.User.LastName.ToLower().Contains(searchString.ToLower())).ToList();
            return found;
        }
    }
}
