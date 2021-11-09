namespace BGSales.Domain.Models
{
    public class Blogger : IEntity
    {
        public string Id { get; set; }
        public ApplicationUser User { get; set; }
        public Image Avatar { get; set; }
        public string AvatarId { get; set; }
        public string UserId { get; set; }
        public string Nickname { get; set; }
        public string UrlInstagram { get; set; }
        public string UrlTwitch { get; set; }
        public string UrlYouTube { get; set; }
        public string UrlTickTok { get; set; }
    }
}
