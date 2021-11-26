using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using BGSales.Web.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        public ChatController(IHubContext<ChatHub> hubContext,
            IChatService chatService,
            IMessageService messageService)
        {
            _hubContext = hubContext;
            _chatService = chatService;
            _messageService = messageService;
        }

        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IChatService _chatService;
        private readonly IMessageService _messageService;

        [Route("{chatId}")]
        [HttpGet]
        public IActionResult OpenChat([FromRoute] string chatId)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var model = _chatService.GetChat(chatId);
            return Ok(model);
        }

        [Route("join")]
        [HttpPost]
        public async Task<IActionResult> CreateChat([FromForm] CreateChatViewModel model)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }
            var chatId = await _chatService.CreateChat(model);
            return Ok(chatId);
        }

        [Route("send")]
        [HttpPost]
        public async Task<IActionResult> SendRequest([FromBody] SendMessageViewModel messageModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (messageModel.SenderUserId != userIdClaim.Value)
            {
                throw new Exception("You don't have permission to send this message");
            }

            var chat = _chatService.GetChat(messageModel.ChatId);
            var sentToUserId = chat.Blogger.UserId != messageModel.SenderUserId ? chat.Blogger.UserId :
                                                                                  chat.Businessman.UserId;
            var message = await _messageService.SendMessage(messageModel);
            await _hubContext.Clients.User(sentToUserId).SendAsync("ReceiveOne", message);
            return Ok();
        }
    }
}
