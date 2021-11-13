using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            CreateMap<CreateOrderViewModel, Order>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Title))
                 .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                 .ForMember(dest => dest.AudienceAge, opt => opt.MapFrom(src => src.AudienceAge))
                 .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate));

            CreateMap<Order, OrderViewModel>()
                 .ForMember(dest => dest.AudienceAge, opt => opt.MapFrom(src => src.AudienceAge))
                 .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Name))
                 .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                 .ForMember(dest => dest.Budget, opt => opt.MapFrom(src => src.Budget))
                 .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate));

            CreateMap<OrderViewModel, PartialOrderViewModel>()
                 .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                 .ForMember(dest => dest.Budget, opt => opt.MapFrom(src => src.Budget))
                 .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Advitiser.NameCompany))
                 .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.OrderId));
        }
    }
}
