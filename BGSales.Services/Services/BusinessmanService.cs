﻿using AutoMapper;
using BGSales.Data.Interfaces;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Views.Models;
using System;
using System.Linq;
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

        public BusinessmanViewModel Get(ApplicationUser user)
        {
            var businessman = _businessmanRepository.Get(b => b.UserId == user.Id).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }
            var model = _mapper.Map<BusinessmanViewModel>(user);
            model = _mapper.Map(businessman, model);

            return model;
        }

        public Businessman GetByUserId(string userId)
        {
            var businessman = _businessmanRepository.Get(b => b.UserId == userId).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }

            return businessman;
        }

        public async Task<BusinessmanViewModel> Update(UpdateBusinessmanViewModel model)
        {
            var businessman = _businessmanRepository.Get(b => b.UserId == model.UserId).SingleOrDefault();

            if (businessman == null)
            {
                throw new System.Exception("Cannot find businessman with this Id!");
            }

            businessman = _mapper.Map(model, businessman);

            try
            {
                await _businessmanRepository.Update(businessman);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            var updatedModel = _mapper.Map<BusinessmanViewModel>(businessman);

            return updatedModel;
        }
    }
}
