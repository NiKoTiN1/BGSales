namespace BGSales.Services.Interfaces
{
    public interface IStripeService
    {
        public string CreateProduct(string productName);
        public string CreatePrice(string productStripeId, long ammountUsd);
    }
}
