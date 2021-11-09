using System;

namespace BGSales.Domain.Models
{
    public class Comment : IEntity
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public ApplicationUser Owner { get; set; }
        public string OwnerId { get; set; }
        public ApplicationUser Сommentator { get; set; }
        public string СommentatorId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
