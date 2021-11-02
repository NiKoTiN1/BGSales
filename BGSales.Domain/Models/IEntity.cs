using System.ComponentModel.DataAnnotations;

namespace BGSales.Domain.Models
{
    public interface IEntity
    {
        [Required]
        public string Id { get; set; }
    }
}
