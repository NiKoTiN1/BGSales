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
                 .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<Order, OrderViewModel>()
                 .ForMember(dest => dest.AudienceAge, opt => opt.MapFrom(src => src.AudienceAge))
                 .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Name))
                 .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                 .ForMember(dest => dest.Budget, opt => opt.MapFrom(src => src.Budget))
                 .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.Advitiser, opt => opt.MapFrom(src => src.Advertiser))
                 .ForMember(dest => dest.BloggerRequests, opt => opt.MapFrom(src => src.BloggerRequests))
                 .ForMember(dest => dest.Blogger, opt => opt.MapFrom(src => src.Blogger))
                 .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => src.CreateDate))
                 .ForMember(dest => dest.StripeId, opt => opt.MapFrom(src => src.StripeId))
                 .ForMember(dest => dest.IsPaid, opt => opt.MapFrom(src => src.IsPaid))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Order, PartialOrderViewModel>()
                 .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Name))
                 .ForMember(dest => dest.Budget, opt => opt.MapFrom(src => src.Budget))
                 .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Advertiser.CompanyName))
                 .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.Requests, opt => opt.MapFrom(src => src.BloggerRequests.Count))
                 .ForMember(dest => dest.AcceptedUserId, opt => opt.MapFrom(src => src.Blogger.UserId));

            CreateMap<UpdateOrderViewModel, Order>()
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Title))
                 .ForMember(dest => dest.AudienceAge, opt => opt.MapFrom(src => src.AudienceAge))
                 .ForMember(dest => dest.Budget, opt => opt.MapFrom(src => src.Budget))
                 .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                 .ForMember(dest => dest.UpdateDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
