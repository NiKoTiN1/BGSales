using BGSales.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [Route("api/[controller]")]
    public class StripeWebHook : Controller
    {
        public StripeWebHook(IConfiguration configuration,
                            IOrderService orderService)
        {
            _configuration = configuration;
            _orderService = orderService;
        }

        private readonly IConfiguration _configuration;
        private readonly IOrderService _orderService;

        [HttpPost]
        [Route("Index")]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var webhookSignature = _configuration["Stripe:WebhookSecret"];
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], webhookSignature);

                switch (stripeEvent.Type)
                {
                    case Events.PaymentIntentSucceeded:
                        {
                            var succeededInvoice = stripeEvent.Data.Object as PaymentIntent;
                            var intentId = succeededInvoice.Id;
                            await _orderService.SetOrderPayed(intentId);
                            break;
                        }
                    default:
                        {
                            Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                            return BadRequest();
                        }
                }
                return Ok();
            }
            catch (StripeException)
            {
                return BadRequest();
            }
        }
    }
}
