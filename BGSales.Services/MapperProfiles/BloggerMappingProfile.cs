using AutoMapper;
using BGSales.Domain.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class BloggerMappingProfile : Profile
    {
        public BloggerMappingProfile()
        {
            CreateMap<ApplicationUser, Blogger>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
             .ForMember(dest => dest.User, opt => opt.MapFrom(src => src))
             .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
