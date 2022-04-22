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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessmanController : Controller
    {
        private readonly IBusinessmanService _businessmanService;
        private readonly IWebHostEnvironment _appEnvironment;
        private readonly IAccountService _accountService;

        public BusinessmanController(IBusinessmanService businessmanService,
            IWebHostEnvironment appEnvironment,
            IAccountService accountService)
        {
            _businessmanService = businessmanService;
            _appEnvironment = appEnvironment;
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

            var user = await _businessmanService.CreateBusinessman(model);

            if (user == null)
            {
                return BadRequest("User with this username is already created!");
            }

            var tokenModel = await _accountService.GenerateToken(user);

            return Ok(tokenModel);
        }

        [HttpPut]
        [Authorize]
        [Route("update")]
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

            var updatedModel = await _businessmanService.Update(viewModel, _appEnvironment.ContentRootPath);

            return Ok(updatedModel);
        }
    }
}
