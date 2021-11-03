using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BGSales.Services.Services
{
    public class TokenService : ITokenService
    {
        public TokenService(
            IRefreshTokenRepository refreshTokenRepository,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager)
        {
            this.refreshTokenRepository = refreshTokenRepository;
            this.configuration = configuration;
            this.userManager = userManager;
        }

        private readonly IRefreshTokenRepository refreshTokenRepository;
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;

        public string GenerateToken(ApplicationUser user)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(Convert.ToInt32(this.configuration["Authentication:LIFETIME"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.configuration["Authentication:KEY"])), SecurityAlgorithms.HmacSha256Signature),
                Audience = this.configuration["Authentication:AUDIENCE"],
                Issuer = this.configuration["Authentication:ISSUER"],
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
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
                ValidIssuer = this.configuration["Authentication:ISSUER"],
                ValidateAudience = true,
                ValidAudience = this.configuration["Authentication:AUDIENCE"],
                ValidateLifetime = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.configuration["Authentication:KEY"])),
                ValidateIssuerSigningKey = true
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            ClaimsPrincipal principal = tokenHandler.ValidateToken(accessToken, tokenValidationParamters, out SecurityToken securityToken);
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
            RefreshToken tokenFromDb = this.refreshTokenRepository.Get(token => token.Token == refreshToken).SingleOrDefault();
            if (tokenFromDb == null)
            {
                return false;
            }

            this.refreshTokenRepository.Remove(tokenFromDb);
            return true;
        }
    }
}
