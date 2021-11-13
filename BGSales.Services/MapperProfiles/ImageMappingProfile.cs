using AutoMapper;
using BGSales.Domain.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class ImageMappingProfile : Profile
    {
        public ImageMappingProfile()
        {
            CreateMap<string, Image>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src));
        }
    }
}
