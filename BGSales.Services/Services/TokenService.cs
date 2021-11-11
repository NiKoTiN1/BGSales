using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class TokenService : ITokenService
    {
        public TokenService(
            IRefreshTokenRepository refreshTokenRepository,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager)
        {
            _refreshTokenRepository = refreshTokenRepository;
            _configuration = configuration;
            _userManager = userManager;
        }

        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;

        public async Task<string> GenerateToken(ApplicationUser user)
        {
            var userRole = Enum.Parse(typeof(Roles), (await _userManager.GetRolesAsync(user)).SingleOrDefault());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("Role", userRole.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["Authentication:LIFETIME"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:KEY"])), SecurityAlgorithms.HmacSha256Signature),
                Audience = _configuration["Authentication:AUDIENCE"],
                Issuer = _configuration["Authentication:ISSUER"],
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken()
            {
                Id = Guid.NewGuid().ToString(),
                Expiration = DateTime.UtcNow.AddMonths(3)
            };
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                refreshToken.Token = Convert.ToBase64String(randomNumber);
            }
            return refreshToken;
        }

        public string GetUserIdFromAccessToken(string accessToken)
        {
            var tokenValidationParamters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _configuration["Authentication:ISSUER"],
                ValidateAudience = true,
                ValidAudience = _configuration["Authentication:AUDIENCE"],
                ValidateLifetime = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:KEY"])),
                ValidateIssuerSigningKey = true
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(accessToken, tokenValidationParamters, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token!");
            }

            var userId = principal.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                throw new SecurityTokenException("Missing claim: UserId!");
            }

            return userId;
        }

        public bool ValidateRefreshToken(ApplicationUser user, string refreshToken)
        {
            if (user == null || user.RefreshToken.Token != refreshToken)
            {
                return false;
            }

            if (DateTime.UtcNow > user.RefreshToken.Expiration)
            {
                return false;
            }
            return true;
        }

        public bool RemoveToken(string refreshToken)
        {
            var tokenFromDb = _refreshTokenRepository.Get(token => token.Token == refreshToken).SingleOrDefault();
            if (tokenFromDb == null)
            {
                return false;
            }

            _refreshTokenRepository.Remove(tokenFromDb);
            return true;
        }
    }
}
