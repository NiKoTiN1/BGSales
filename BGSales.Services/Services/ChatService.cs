﻿using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class ChatService : IChatService
    {
        public ChatService(IChatRepository chatRepository,
            IBloggerService bloggerService,
            IBusinessmanService businessmanService,
            IMapper mapper)
        {
            _chatRepository = chatRepository;
            _bloggerService = bloggerService;
            _businessmanService = businessmanService;
            _mapper = mapper;
        }

        private readonly IChatRepository _chatRepository;
        private readonly IBloggerService _bloggerService;
        private readonly IBusinessmanService _businessmanService;
        private readonly IMapper _mapper;

        public async Task<string> CreateChat(CreateChatViewModel model)
        {
            var blogger = _bloggerService.GetByUserId(model.BloggerUserId);
            var businessman = _businessmanService.GetByUserId(model.BusinessmanUserId);
            var chat = new Chat()
            {
                Id = Guid.NewGuid().ToString(),
                BloggerId = blogger.Id,
                BusinessmanId = businessman.Id
            };
            await _chatRepository.Add(chat);
            return chat.Id;
        }

        public ChatViewModel GetChat(string chatId)
        {
            var chat = _chatRepository.Get(ch => ch.Id == chatId, new[] { "Blogger", "Businessman" })
                .SingleOrDefault();
            if (chat == null)
            {
                throw new Exception("Chat is not found");
            }

            var chatModel = _mapper.Map<ChatViewModel>(chat);

            return chatModel;
        }
    }
}