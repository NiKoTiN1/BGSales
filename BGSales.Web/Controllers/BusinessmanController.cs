using AutoMapper;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BGSales.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessmanController : Controller
    {
        private readonly IBusinessmanService _businessmanService;
        private readonly IMapper _mapper;
        public BusinessmanController(IBusinessmanService businessmanService,
            IMapper mapper)
        {
            _businessmanService = businessmanService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model error!");
            }

            var user = await _businessmanService.CreateBusinessman(model);

            if (user == null)
            {
                return BadRequest("User with this username is already created!");
            }

            var loginModel = _mapper.Map<LoginViewModel>(model);

            return RedirectToAction("Login", "Account", loginModel);
        }
    }
}
