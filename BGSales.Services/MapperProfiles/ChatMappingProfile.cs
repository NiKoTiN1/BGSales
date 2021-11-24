using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;

namespace BGSales.Services.MapperProfiles
{
    public class ChatMappingProfile : Profile
    {
        public ChatMappingProfile()
        {
            CreateMap<Chat, ChatViewModel>()
                 .ForMember(dest => dest.ChatId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Businessman, opt => opt.MapFrom(src => src.Businessman))
            .ForMember(dest => dest.Blogger, opt => opt.MapFrom(src => src.Blogger));
        }
    }
}
