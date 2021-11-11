using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        public TokenController(ITokenService tokenService, IAccountService accountService)
        {
            _tokenService = tokenService;
            _accountService = accountService;
        }

        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;

        [HttpPut]
        [Route("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenViewModel model)
        {
            if (model.RefreshToken == null || string.IsNullOrEmpty(model.RefreshToken))
            {
                return Unauthorized();
            }
            if (model.AccessToken == null || string.IsNullOrEmpty(model.AccessToken))
            {
                _tokenService.RemoveToken(model.RefreshToken);
                return BadRequest(new { Error = "You have no refreshToken!" });
            }

            var userId = _tokenService.GetUserIdFromAccessToken(model.AccessToken);
            var user = await _accountService.GetById(userId);
            var isRefreshTokenValid = _tokenService.ValidateRefreshToken(user, model.RefreshToken);
            if (!isRefreshTokenValid)
            {
                return BadRequest();
            }
            model.AccessToken = await _tokenService.GenerateToken(user);
            return Ok(model);
        }
    }
}
