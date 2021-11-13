using Microsoft.AspNetCore.Http;

namespace BGSales.Views.Models
{
    public class UpdateBusinessmanViewModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string NameCompany { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
