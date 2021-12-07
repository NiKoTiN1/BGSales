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
            IMessageService messageService,
            IMapper mapper)
        {
            _chatRepository = chatRepository;
            _bloggerService = bloggerService;
            _businessmanService = businessmanService;
            _messageService = messageService;
            _mapper = mapper;
        }

        private readonly IChatRepository _chatRepository;
        private readonly IBloggerService _bloggerService;
        private readonly IBusinessmanService _businessmanService;
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public async Task<string> CreateChat(CreateChatViewModel model)
        {
            var blogger = _bloggerService.GetByUserId(model.BloggerUserId);
            var businessman = _businessmanService.GetByUserId(model.BusinessmanUserId);

            var checkChat = _chatRepository.Get(ch => ch.BloggerId == blogger.Id && ch.BusinessmanId == businessman.Id)
                .SingleOrDefault();

            if (checkChat != null)
            {
                throw new Exception("The chat already created");
            }

            var chat = new Chat()
            {
                Id = Guid.NewGuid().ToString(),
                BloggerId = blogger.Id,
                BusinessmanId = businessman.Id
            };
            await _chatRepository.Add(chat);
            return chat.Id;
        }

        public ChatViewModel GetChat(string chatId, string currentUserId)
        {
            var chat = _chatRepository.Get(ch => ch.Id == chatId, new[] { "Blogger", "Businessman" })
                .SingleOrDefault();
            if (chat == null)
            {
                throw new Exception("Chat is not found");
            }

            var chatModel = _mapper.Map<ChatViewModel>(chat);

            if (currentUserId == chat.Businessman.UserId)
            {
                chatModel.RecivierInfo = _mapper.Map<UserViewModel>(chat.Blogger.User);
            }
            else
            {
                chatModel.RecivierInfo = _mapper.Map<UserViewModel>(chat.Businessman.User);
            }

            var messages = _messageService.GetChatMessages(chatId, currentUserId);
            chatModel.Messages = messages;
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
            Blogger blogger = null;
            Businessman businessman = null;

            try
            {
                blogger = _bloggerService.GetByUserId(userId);
            }
            catch
            {
                businessman = _businessmanService.GetByUserId(userId);
            }

            if (blogger != null)
            {
                var chats = _chatRepository.Get(ch => ch.BloggerId == blogger.Id, new[] { "Blogger", "Businessman" }).ToList();

                foreach (var chat in chats)
                {
                    var imageUrl = !string.IsNullOrEmpty(chat.Businessman.User.AvatarId) ? chat.Businessman.User.Avatar.Path : null;
                    var model = new PartialChatViewModel()
                    {
                        ChatId = chat.Id,
                        UserId = chat.Businessman.UserId,
                        FirstName = chat.Businessman.User.FirstName,
                        SecondName = chat.Businessman.User.LastName,
                        ImageUrl = imageUrl
                    };

                    chatModels.Add(model);
                }
            }
            else
            {
                var chats = _chatRepository.Get(ch => ch.BusinessmanId == businessman.Id, new[] { "Blogger", "Businessman" }).ToList();

                foreach (var chat in chats)
                {
                    var imageUrl = !string.IsNullOrEmpty(chat.Blogger.User.AvatarId) ? chat.Blogger.User.Avatar.Path : null;
                    var model = new PartialChatViewModel()
                    {
                        ChatId = chat.Id,
                        UserId = chat.Blogger.UserId,
                        FirstName = chat.Blogger.User.FirstName,
                        SecondName = chat.Blogger.User.LastName,
                        ImageUrl = imageUrl
                    };

                    chatModels.Add(model);
                }
            }

            return chatModels;
        }
    }
}
