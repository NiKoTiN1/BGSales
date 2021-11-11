using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        public AccountController(IAccountService accountService, ITokenService tokenService, IMapper mapper)
        {
            this.accountService = accountService;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }

        private readonly IAccountService accountService;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegistrationViewModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest("Model error!");
            }

            ApplicationUser user = await this.accountService.CreateUser(model);

            if (user == null)
            {
                return this.BadRequest("User with this username is already created!");
            }

            user.RefreshToken = this.tokenService.GenerateRefreshToken();
            var isUpdated = await this.accountService.UpdateUser(user);

            if (!isUpdated)
            {
                this.BadRequest("User cannot set refresh error!");
            }

            TokenViewModel tokenModel = this.mapper.Map<TokenViewModel>(user.RefreshToken);
            tokenModel.AccessToken = this.tokenService.GenerateToken(user);

            return this.Ok(tokenModel);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginViewModel model)
        {
            ApplicationUser user = await this.accountService.GetByEmail(model.Email);

            if (!this.accountService.VerifyUser(user, model.Password))
            {
                return this.BadRequest("Invalid email or password.");
            }

            user.RefreshToken = this.tokenService.GenerateRefreshToken();
            var isUpdated = await this.accountService.UpdateUser(user);

            if (!isUpdated)
            {
                this.BadRequest("User cannot set refresh error!");
            }

            TokenViewModel tokenModel = this.mapper.Map<TokenViewModel>(user.RefreshToken);
            tokenModel.AccessToken = this.tokenService.GenerateToken(user);

            return this.Ok(tokenModel);
        }
    }
}
