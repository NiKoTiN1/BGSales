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
            IMapper mapper,
            IBloggerService bloggerService,
            IBusinessmanService businessmanService,
            IWebHostEnvironment appEnvironment,
            IChatService chatService)
        {
            _accountService = accountService;
            _mapper = mapper;
            _bloggerService = bloggerService;
            _businessmanService = businessmanService;
            _appEnvironment = appEnvironment;
            _chatService = chatService;
        }

        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IBloggerService _bloggerService;
        private readonly IBusinessmanService _businessmanService;
        private readonly IWebHostEnvironment _appEnvironment;
        private readonly IChatService _chatService;

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginViewModel model)
        {
            var user = await _accountService.GetByEmail(model.Email);

            if (!_accountService.VerifyUser(user, model.Password))
            {
                return BadRequest("Invalid email or password.");
            }

            var tokenModel = await _accountService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpGet]
        [Authorize]
        [Route("profile/{userId?}")]
        public async Task<IActionResult> Profile([FromRoute] string userId = null)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(userId))
            {
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
            else
            {
                var isAdmin = await _accountService.IsAdmin(userId);
                if (isAdmin)
                {
                    throw new Exception("You cannot see this user");
                }

                var user = await _accountService.GetById(userId);

                if (user == null)
                {
                    throw new Exception("User not found!");
                }

                if (user.UserType == UserType.Blogger)
                {
                    var model = _bloggerService.Get(user);

                    var blogger = _bloggerService.GetByUserId(userId);
                    var businessman = _businessmanService.GetByUserId(userIdClaim.Value);
                    model.ChatId = _chatService.GetChatId(blogger.Id, businessman.Id);

                    return Ok(model);
                }
                else
                {
                    var model = _businessmanService.Get(user);
                    return Ok(model);
                }
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
    }
}
