using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using System.Threading.Tasks;

namespace BGSales.Services.Services
{
    public class BusinessmanService : IBusinessmanService
    {
        public BusinessmanService(IBusinessmanRepository businessmanRepository,
            IMapper mapper)
        {
            _businessmanRepository = businessmanRepository;
            _mapper = mapper;
        }

        private readonly IBusinessmanRepository _businessmanRepository;
        private readonly IMapper _mapper;

        public async Task CreateBusinessman(ApplicationUser user)
        {
            var businessman = _mapper.Map<Businessman>(user);

            await _businessmanRepository.Add(businessman);
        }
    }
}
