using BGSales.Services.Interfaces;
using Stripe;

namespace BGSales.Services.Services
{
    public class StripeService : IStripeService
    {

        public string CreateProduct(string productName)
        {
            var options = new ProductCreateOptions
            {
                Name = productName,
            };
            var service = new ProductService();
            var product = service.Create(options);

            return product.Id;
        }

        public string CreatePrice(string productStripeId, long ammountUsd)
        {
            var options = new PriceCreateOptions
            {
                UnitAmount = ammountUsd,
                Currency = "usd",
                Product = productStripeId,
            };
            var service = new PriceService();
            var price = service.Create(options);

            return price.Id;
        }
    }
}
