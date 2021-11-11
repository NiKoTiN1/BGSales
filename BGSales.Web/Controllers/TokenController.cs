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
            this.tokenService = tokenService;
            this.accountService = accountService;
        }

        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;

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
                tokenService.RemoveToken(model.RefreshToken);
                return BadRequest(new { Error = "You have no refreshToken!" });
            }

            var userId = tokenService.GetUserIdFromAccessToken(model.AccessToken);
            var user = await accountService.GetById(userId);
            var isRefreshTokenValid = tokenService.ValidateRefreshToken(user, model.RefreshToken);
            if (!isRefreshTokenValid)
            {
                return BadRequest();
            }
            model.AccessToken = tokenService.GenerateToken(user);
            return Ok(model);
        }
    }
}
