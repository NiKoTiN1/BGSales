using Microsoft.AspNetCore.Http;

namespace BGSales.Views.Models
{
    public class UpdateBloggerViewModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Nickname { get; set; }
        public string UrlInstagram { get; set; }
        public string UrlTwitch { get; set; }
        public string UrlYouTube { get; set; }
        public string UrlTickTok { get; set; }
        public IFormFile ImageFile { get; set; }
        public string Activity { get; set; }
        public string Subjects { get; set; }
        public int Subscribers { get; set; }
        public int AgeAudience { get; set; }
    }
}
