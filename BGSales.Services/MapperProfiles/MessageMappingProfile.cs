using AutoMapper;
using BGSales.Domain.Models;
using BGSales.Views.Models;
using System;

namespace BGSales.Services.MapperProfiles
{
    public class MessageMappingProfile : Profile
    {
        public MessageMappingProfile()
        {
            CreateMap<SendMessageViewModel, Message>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
                 .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                 .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderUserId))
                 .ForMember(dest => dest.ChatId, opt => opt.MapFrom(src => src.ChatId))
                 .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));

            CreateMap<Message, MessageViewModel>()
                 .ForMember(dest => dest.SenderUserId, opt => opt.MapFrom(src => src.SenderId))
                 .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
                 .ForMember(dest => dest.SentTime, opt => opt.MapFrom(src => src.CreateDate))
                 .ForMember(dest => dest.MessageId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
