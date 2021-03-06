using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class BloggerMappingProfile : Profile
    {
        public BloggerMappingProfile()
        {
            CreateMap<ApplicationUser, Blogger>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));

            CreateMap<Blogger, BloggerViewModel>()
                 .ForMember(dest => dest.UrlInstagram, opt => opt.MapFrom(src => src.UrlInstagram))
                 .ForMember(dest => dest.UrlTickTok, opt => opt.MapFrom(src => src.UrlTickTok))
                 .ForMember(dest => dest.UrlTwitch, opt => opt.MapFrom(src => src.UrlTwitch))
                 .ForMember(dest => dest.UrlYouTube, opt => opt.MapFrom(src => src.UrlYouTube))
                 .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity))
                 .ForMember(dest => dest.Subjects, opt => opt.MapFrom(src => src.Subjects))
                 .ForMember(dest => dest.Subscribers, opt => opt.MapFrom(src => src.Subscribers))
                 .ForMember(dest => dest.AgeAudience, opt => opt.MapFrom(src => src.AgeAudience))
                 .ForMember(dest => dest.BloggerExperience, opt => opt.MapFrom(src => src.BloggerExperience))
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                 .ForMember(dest => dest.SecondName, opt => opt.MapFrom(src => src.User.LastName))
                 .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.Avatar.Path))
                 .ForMember(dest => dest.Nickname, opt => opt.MapFrom(src => src.Nickname));

            CreateMap<UpdateBloggerViewModel, Blogger>()
                 .ForMember(dest => dest.UrlInstagram, opt => opt.MapFrom(src => src.UrlInstagram))
                 .ForMember(dest => dest.UrlTickTok, opt => opt.MapFrom(src => src.UrlTickTok))
                 .ForMember(dest => dest.UrlTwitch, opt => opt.MapFrom(src => src.UrlTwitch))
                 .ForMember(dest => dest.UrlYouTube, opt => opt.MapFrom(src => src.UrlYouTube))
                 .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity))
                 .ForMember(dest => dest.Subjects, opt => opt.MapFrom(src => src.Subjects))
                 .ForMember(dest => dest.Subscribers, opt => opt.MapFrom(src => src.Subscribers))
                 .ForMember(dest => dest.AgeAudience, opt => opt.MapFrom(src => src.AgeAudience))
                 .ForMember(dest => dest.Nickname, opt => opt.MapFrom(src => src.Nickname))
                 .ForMember(dest => dest.BloggerExperience, opt => opt.MapFrom(src => src.BloggerExperience))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Blogger, BloggerPartialViewModel>()
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                 .ForMember(dest => dest.SecondName, opt => opt.MapFrom(src => src.User.LastName))
                 .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.Avatar.Path))
                 .ForMember(dest => dest.NumberSubscribers, opt => opt.MapFrom(src => src.Subscribers))
                 .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity));
        }
    }
}
