using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;

namespace BGSales.Services.MapperProfiles
{
    public class TokenMappingProfile : Profile
    {
        public TokenMappingProfile()
        {
            CreateMap<RefreshToken, TokenViewModel>()
                    .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => src.Token));
        }
    }
}
