using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using BGSales.Web.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IChatService _chatService;

        public ChatController(IHubContext<ChatHub> hubContext,
            IChatService chatService)
        {
            _hubContext = hubContext;
            _chatService = chatService;
        }

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
    }
}
