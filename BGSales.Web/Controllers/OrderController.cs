using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private readonly IOrderService _orderService;

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateOrder([FromForm] CreateOrderViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            await _orderService.CreateOrder(viewModel, userIdClaim.Value);

            return Ok();
        }
    }
}
