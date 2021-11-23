using BGSales.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BGSales.Web.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BloggerController : Controller
    {
        public BloggerController(IBloggerService bloggerService)
        {
            _bloggerService = bloggerService;
        }

        private readonly IBloggerService _bloggerService;

        [HttpGet]
        [Route("all")]
        public IActionResult GetAllBloggers()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "UserId");

            if (string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized();
            }

            var model = _bloggerService.GetAllBloggers();

            return Ok(model);
        }
    }
}
