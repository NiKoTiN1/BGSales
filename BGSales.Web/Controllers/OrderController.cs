using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet]
        [Route("{orderId}")]
        public IActionResult GetOrder([FromRoute] string orderId)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var model = _orderService.GetOrderInfo(orderId);

            return Ok(model);
        }

        [HttpGet]
        [Route("available/{bloggerUserId}")]
        public IActionResult GetAllAvailableOrders([FromRoute] string bloggerUserId)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(bloggerUserId))
            {
                throw new Exception("UserId is required");
            }

            if (bloggerUserId != userIdClaim.Value)
            {
                throw new Exception("You have no permission to get this order");
            }

            var model = _orderService.GetAllAvailablePartialOrders(userIdClaim.Value);

            return Ok(model);
        }

        [HttpGet]
        [Route("all/{businessmanUserId}")]
        public IActionResult GetAllBusinessmanOrders([FromRoute] string businessmanUserId)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(businessmanUserId))
            {
                throw new Exception("UserId is required");
            }

            if (businessmanUserId != userIdClaim.Value)
            {
                throw new Exception("You have no permission to get this order");
            }

            var model = _orderService.GetAllBusinessmanOrders(userIdClaim.Value);

            return Ok(model);
        }

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

        [HttpPost]
        [Route("request")]
        public async Task<IActionResult> RequestOrder([FromForm] RequestOrderViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            if (userIdClaim.Value != viewModel.UserId)
            {
                return BadRequest();
            }

            await _orderService.RequestOrder(viewModel);

            return Ok();
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> CreateOrder([FromForm] UpdateOrderViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var updatedModel = await _orderService.UpdateOrder(viewModel, userIdClaim.Value);

            return Ok(updatedModel);
        }

        [HttpDelete]
        [Route("remove/{orderId}")]
        public async Task<IActionResult> RemoveOrder([FromRoute] string orderId)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            await _orderService.DeleteOrder(orderId, userIdClaim.Value);

            return Ok();
        }
    }
}
