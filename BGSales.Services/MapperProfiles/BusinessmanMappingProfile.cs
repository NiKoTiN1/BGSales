using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class BusinessmanMappingProfile : Profile
    {
        public BusinessmanMappingProfile()
        {
            CreateMap<ApplicationUser, Businessman>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));

            CreateMap<Businessman, BusinessmanViewModel>()
                  .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                 .ForMember(dest => dest.SecondName, opt => opt.MapFrom(src => src.User.LastName))
                 .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.Avatar.Path))
                 .ForMember(dest => dest.OrdersCount, opt => opt.MapFrom(src => src.Orders.Count))
                 .ForMember(dest => dest.NameCompany, opt => opt.MapFrom(src => src.CompanyName));

            CreateMap<UpdateBusinessmanViewModel, Businessman>()
                 .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.NameCompany))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
