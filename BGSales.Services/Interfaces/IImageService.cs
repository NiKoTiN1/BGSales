using BGSales.Domain.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BGSales.Services.Interfaces
{
    public interface IImageService
    {
        public Task<Image> CreateImage(string rootPath, IFormFile image);
    }
}
