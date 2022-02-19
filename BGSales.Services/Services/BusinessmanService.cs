using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Dtos.User;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class BusinessmanService : IBusinessmanService
    {
        public BusinessmanService(IBusinessmanRepository businessmanRepository,
            IAccountService accountService,
            IImageService imageService,
            IMapper mapper)
        {
            _businessmanRepository = businessmanRepository;
            _accountService = accountService;
            _imageService = imageService;
            _mapper = mapper;
        }

        private readonly IBusinessmanRepository _businessmanRepository;
        private readonly IAccountService _accountService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public async Task<ApplicationUser> CreateBusinessman(RegistrationViewModel model)
        {
            var registrationDto = new RegistrationDto()
            {
                UserId = Guid.NewGuid().ToString(),
                Model = model,
                UserType = UserType.Businessman
            };
            var user = await _accountService.CreateUser(registrationDto);
            var businessman = _mapper.Map<Businessman>(user);

            await _businessmanRepository.Add(businessman);

            return user;
        }

        public BusinessmanViewModel Get(ApplicationUser user)
        {
            var businessman = _businessmanRepository.Get(b => b.UserId == user.Id, new[] { "Orders" }).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }
            var model = _mapper.Map<BusinessmanViewModel>(businessman);

            return model;
        }

        public Businessman GetByUserId(string userId)
        {
            var businessman = _businessmanRepository.Get(b => b.UserId == userId).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }

            return businessman;
        }

        public async Task<BusinessmanViewModel> Update(UpdateBusinessmanViewModel model, string rootPath)
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

            var businessman = _businessmanRepository.Get(b => b.UserId == model.UserId).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }

            businessman = _mapper.Map(model, businessman);

            try
            {
                await _businessmanRepository.Update(businessman);
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

            var updatedModel = _mapper.Map<BusinessmanViewModel>(businessman);

            return updatedModel;
        }

        public Businessman GetByBusinessmanId(string id)
        {
            var businessman = _businessmanRepository.Get(b => b.Id == id).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this BusinessId!");
            }

            return businessman;
        }
    }
}
