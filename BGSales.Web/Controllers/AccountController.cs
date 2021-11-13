using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        public AccountController(IAccountService accountService,
            ITokenService tokenService,
            IMapper mapper,
            IBloggerService bloggerService,
            IBusinessmanService businessmanService,
            IWebHostEnvironment appEnvironment)
        {
            _accountService = accountService;
            _tokenService = tokenService;
            _mapper = mapper;
            _bloggerService = bloggerService;
            _businessmanService = businessmanService;
            _appEnvironment = appEnvironment;
        }

        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IBloggerService _bloggerService;
        private readonly IBusinessmanService _businessmanService;
        private readonly IWebHostEnvironment _appEnvironment;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model error!");
            }

            var user = await _accountService.CreateUser(model);

            if (user == null)
            {
                return BadRequest("User with this username is already created!");
            }

            user.RefreshToken = _tokenService.GenerateRefreshToken();
            var isUpdated = await _accountService.UpdateUser(user);

            if (!isUpdated)
            {
                BadRequest("User cannot set refresh error!");
            }

            var tokenModel = _mapper.Map<TokenViewModel>(user.RefreshToken);
            tokenModel.AccessToken = await _tokenService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginViewModel model)
        {
            var user = await _accountService.GetByEmail(model.Email);

            if (!_accountService.VerifyUser(user, model.Password))
            {
                return BadRequest("Invalid email or password.");
            }

            user.RefreshToken = _tokenService.GenerateRefreshToken();
            var isUpdated = await _accountService.UpdateUser(user);

            if (!isUpdated)
            {
                BadRequest("User cannot set refresh error!");
            }

            var tokenModel = _mapper.Map<TokenViewModel>(user.RefreshToken);
            tokenModel.AccessToken = await _tokenService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpGet]
        [Authorize]
        [Route("profile")]
        public async Task<IActionResult> Profile()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var user = await _accountService.GetById(userIdClaim.Value);

            if (user == null)
            {
                throw new Exception("User not found!");
            }

            if (user.UserType == UserType.Blogger)
            {
                var model = _bloggerService.Get(user);
                return Ok(model);
            }
            else
            {
                var model = _businessmanService.Get(user);
                return Ok(model);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("profile/parital")]
        public async Task<IActionResult> ProfileParital()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var user = await _accountService.GetById(userIdClaim.Value);

            if (user == null)
            {
                throw new Exception("User not found!");
            }

            var model = _mapper.Map<PartialProfileViewModel>(user);
            return Ok(model);
        }

        [HttpPut]
        [Authorize]
        [Route("update/blogger")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateBloggerViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (viewModel.UserId != userIdClaim.Value)
            {
                throw new Exception("You cannot update this profile.");
            }

            var updatedModel = await _accountService.UpdateBlogger(viewModel, _appEnvironment.ContentRootPath);

            return Ok(updatedModel);
        }

        [HttpPut]
        [Authorize]
        [Route("update/businessman")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateBusinessmanViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (viewModel.UserId != userIdClaim.Value)
            {
                throw new Exception("You cannot update this profile.");
            }

            var updatedModel = await _accountService.UpdateBusinessman(viewModel, _appEnvironment.ContentRootPath);

            return Ok(updatedModel);
        }
    }
}
