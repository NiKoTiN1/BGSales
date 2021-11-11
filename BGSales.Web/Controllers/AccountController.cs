using AutoMapper;
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
            _accountService = accountService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

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
    }
}
