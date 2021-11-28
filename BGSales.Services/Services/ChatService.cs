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

        public string GetChatId(string bloggerId, string businessmanId)
        {
            var chatId = _chatRepository.Get(ch => ch.BloggerId == bloggerId &&
                ch.BusinessmanId == businessmanId).Select(ch => ch.Id)
                .SingleOrDefault();

            if (string.IsNullOrEmpty(chatId))
            {
                return null;
            }

            return chatId;
        }

        public List<PartialChatViewModel> GetAllChats(string userId)
        {
            var chatModels = new List<PartialChatViewModel>();

            try
            {
                var blogger = _bloggerService.GetByUserId(userId);
                var chats = _chatRepository.Get(ch => ch.BloggerId == blogger.Id, new[] { "Blogger", "Businessman" }).ToList();

                foreach (var chat in chats)
                {
                    var model = new PartialChatViewModel()
                    {
                        ChatId = chat.Id,
                        UserId = chat.Businessman.UserId,
                        FirstName = chat.Businessman.User.FirstName,
                        SecondName = chat.Businessman.User.LastName,
                    };

                    chatModels.Add(model);
                }
            }
            catch
            {
                var businessman = _businessmanService.GetByUserId(userId);
                var chats = _chatRepository.Get(ch => ch.BusinessmanId == businessman.Id, new[] { "Blogger", "Businessman" }).ToList();

                foreach (var chat in chats)
                {
                    var model = new PartialChatViewModel()
                    {
                        ChatId = chat.Id,
                        UserId = chat.Blogger.UserId,
                        FirstName = chat.Blogger.User.FirstName,
                        SecondName = chat.Blogger.User.LastName,
                    };

                    chatModels.Add(model);
                }
            }

            return chatModels;
        }
    }
}
