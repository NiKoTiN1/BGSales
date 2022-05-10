using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private const string domain = "http://localhost:8081/";

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

            var model = _orderService.GetOrderInfo(orderId, userIdClaim.Value);

            return Ok(model);
        }

        [HttpGet]
        [Route("available/{bloggerUserId}/{searchString?}")]
        public IActionResult GetAllAvailableOrders([FromRoute] string bloggerUserId, [FromRoute] string searchString)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            CheckPermission(bloggerUserId, userIdClaim);

            var model = _orderService.GetAllAvailablePartialOrders(userIdClaim.Value, searchString);

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

            CheckPermission(businessmanUserId, userIdClaim);

            var model = _orderService.GetAllBusinessmanOrders(userIdClaim.Value);

            return Ok(model);
        }

        [HttpGet]
        [Route("requested/{bloggerUserId}/{searchString?}")]
        public IActionResult GetAllRequestedOrders([FromRoute] string bloggerUserId, [FromRoute] string searchString)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            CheckPermission(bloggerUserId, userIdClaim);

            var model = _orderService.GetAllRequestedPartialOrders(userIdClaim.Value, searchString);

            return Ok(model);
        }

        [HttpGet]
        [Route("accepted/{bloggerUserId}/{searchString?}")]
        public async Task<IActionResult> GetBloggerAcceptedOrders([FromRoute] string bloggerUserId, [FromRoute] string searchString)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            CheckPermission(bloggerUserId, userIdClaim);

            var model = await _orderService.GetAcceptedBloggerOrders(userIdClaim.Value, searchString);

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

            CheckPermission(viewModel.UserId, userIdClaim);

            await _orderService.RequestOrder(viewModel);

            return Ok();
        }

        [HttpPost]
        [Route("accept")]
        public async Task<IActionResult> AcceptOrder([FromForm] AcceptOrderViewModel viewModel)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            CheckPermission(viewModel.BusinessmanUserId, userIdClaim);

            await _orderService.AcceptOrder(viewModel);

            return Ok();
        }

        [EnableCors("AllowAnyOriginPolicy")]
        [Route("purchase")]
        [HttpPost]
        public async Task<IActionResult> Purchse([FromForm] PaymentViewModel paymentModel)
        {
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = paymentModel.StripeId,
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = domain + "projects/myProjects/" + paymentModel.OrderId,
                CancelUrl = domain + "projects/myProjects/" + paymentModel.OrderId,
            };
            var service = new SessionService();
            var session = service.Create(options);

            await _orderService.SetOrderPaymentIntent(paymentModel.OrderId, session.PaymentIntentId);

            Response.Headers.Add("Location", session.Url);
            return Ok(session.Url);
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

        private void CheckPermission(string modelBloggerId, Claim userIdClaim)
        {
            if (string.IsNullOrEmpty(modelBloggerId))
            {
                throw new Exception("UserId is required");
            }

            if (modelBloggerId != userIdClaim.Value)
            {
                throw new Exception("You have no permission to get this order");
            }
        }
    }
}
