using BGSales.Domain.Models;

namespace BGSales.Services.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(ApplicationUser user);
        public RefreshToken GenerateRefreshToken();
        public string GetUserIdFromAccessToken(string accessToken);
        public bool ValidateRefreshToken(ApplicationUser user, string refreshToken);
        public bool RemoveToken(string refreshToken);
    }
}
