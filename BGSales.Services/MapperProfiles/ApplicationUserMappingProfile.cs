using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class ApplicationUserMappingProfile : Profile
    {
        public ApplicationUserMappingProfile()
        {
            CreateMap<RegistrationViewModel, ApplicationUser>()
                 .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                 .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                 .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                 .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => Enum.Parse<UserType>(src.UserType)));

            CreateMap<UpdateBloggerViewModel, ApplicationUser>()
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                 .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.SecondName))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<UpdateBusinessmanViewModel, ApplicationUser>()
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                 .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.SecondName))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<ApplicationUser, StripeInfo>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.Balance, opt => opt.MapFrom(src => 0));

            CreateMap<ApplicationUser, PartialProfileViewModel>()
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.UrlImage, opt => opt.MapFrom(src => src.Avatar.Path))
                 .ForMember(dest => dest.Money, opt => opt.MapFrom(src => src.StripeInfo.Balance));

            CreateMap<ApplicationUser, UserViewModel>()
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                 .ForMember(dest => dest.SecondName, opt => opt.MapFrom(src => src.LastName))
                 .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Avatar.Path));
        }
    }
}
