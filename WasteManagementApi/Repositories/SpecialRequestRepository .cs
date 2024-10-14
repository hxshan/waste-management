using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WasteManagementApi.Data;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Repositories
{
    public class SpecialRequestRepository : ISpecialRequestRepository
    {
        private readonly ApplicationDbContext _context;

        public SpecialRequestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SpecialRequest> CreateAsync(SpecialRequest specialRequest)
        {
            await _context.SpecialRequests.AddAsync(specialRequest);
            await _context.SaveChangesAsync();
            return specialRequest;
        }

        public async Task<IEnumerable<SpecialRequest>> GetByUserIdAsync(string userId)
        {
            return await _context.SpecialRequests
                .Where(sr => sr.ClientId == userId)
                .ToListAsync();
        }

        public async Task<SpecialRequest> GetByIdAsync(string id)
        {
            return await _context.SpecialRequests.FindAsync(id);
        }

        public async Task<IEnumerable<SpecialRequest>> GetAllAsync()
        {
            return await _context.SpecialRequests.ToListAsync();
        }

        public async Task<SpecialRequest> UpdateAsync(SpecialRequest specialRequest)
        {
            _context.Entry(specialRequest).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return specialRequest;
        }

        public async Task DeleteAsync(string id)
        {
            var specialRequest = await _context.SpecialRequests.FindAsync(id);
            if (specialRequest != null)
            {
                _context.SpecialRequests.Remove(specialRequest);
                await _context.SaveChangesAsync();
            }
        }
    }
}