using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class ImageService : IImageService
    {
        public ImageService(IConfiguration configuration,
            IImageRepository imageRepository,
            IMapper mapper)
        {
            _configuration = configuration;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        private readonly IConfiguration _configuration;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public async Task<Image> CreateImage(string rootPath, IFormFile image)
        {
            var imageName = Guid.NewGuid().ToString();
            var url = rootPath + _configuration["Storage:Images:Server:Jpg"] + "\\" + imageName + ".jpg";

            using (var fileStream = new FileStream(url, FileMode.Create, FileAccess.Write))
            {
                await image.CopyToAsync(fileStream);
            }

            var imageModel = _mapper.Map<Image>(imageName + ".jpg");
            await _imageRepository.Add(imageModel);

            return imageModel;
        }
    }
}
