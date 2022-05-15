using AutoMapper;
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
    [Authorize]
    [Route("api/[controller]")]
    public class BloggerController : Controller
    {
        private readonly IBloggerService _bloggerService;
        private readonly IAccountService _accountService;
        private readonly IWebHostEnvironment _appEnvironment;

        public BloggerController(IBloggerService bloggerService,
            IAccountService accountService,
            IWebHostEnvironment appEnvironment)
        {
            _bloggerService = bloggerService;
            _accountService = accountService;
            _appEnvironment = appEnvironment;
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

            var tokenModel = await _accountService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpGet]
        [Route("all/{searchString?}")]
        public IActionResult GetAllBloggers([FromRoute] string searchString = null)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var model = _bloggerService.GetAllBloggers(searchString);

            return Ok(model);
        }

        [HttpPut]
        [Authorize]
        [Route("update")]
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

            var updatedModel = await _bloggerService.Update(viewModel, _appEnvironment.ContentRootPath);

            return Ok(updatedModel);
        }
    }
}
