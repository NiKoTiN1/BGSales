using BGSales.Domain.Models;
using BGSales.Views.Models;

namespace BGSales.Services.Dtos.User
{
    public class RegistrationDto
    {
        public string UserId { get; set; }
        public RegistrationViewModel Model { get; set; }
        public UserType UserType { get; set; }
    }
}
