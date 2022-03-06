using AutoMapper;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BloggerController : Controller
    {
        private readonly IBloggerService _bloggerService;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public BloggerController(IBloggerService bloggerService,
            IAccountService accountService,
            IMapper mapper)
        {
            _bloggerService = bloggerService;
            _mapper = mapper;
            _accountService = accountService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model error!");
            }

            var user = await _bloggerService.CreateBlogger(model);

            if (user == null)
            {
                return BadRequest("User with this username is already created!");
            }

            var loginModel = _mapper.Map<LoginViewModel>(model);
            var tokenModel = await _accountService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpGet]
        [Route("all")]
        public IActionResult GetAllBloggers()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var model = _bloggerService.GetAllBloggers();

            return Ok(model);
        }
    }
}
