using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class MessageService : IMessageService
    {
        public MessageService(IMessageRepository messageRepository,
            IMapper mapper)
        {
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public async Task<MessageViewModel> SendMessage(SendMessageViewModel model)
        {
            var message = _mapper.Map<Message>(model);
            await _messageRepository.Add(message);
            message = _messageRepository.Get(m => m.Id == message.Id)
                .SingleOrDefault();

            if (message == null)
            {
                throw new Exception("Error during creating message model");
            }

            return _mapper.Map<MessageViewModel>(message);
        }

        public List<MessageViewModel> GetChatMessages(string chatId, string currentUserId)
        {
            var messages = _messageRepository.Get(m => m.ChatId == chatId)
                .OrderBy(m => m.CreateDate)
                .ToList();
            var messageModels = _mapper.Map<List<MessageViewModel>>(messages);
            return messageModels;
        }
    }
}
