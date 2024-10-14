using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Data;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Repositories
{
    public class NormalRequestRepository : INormalRequestRepository
    {
        private readonly ApplicationDbContext _context;
        public NormalRequestRepository(ApplicationDbContext context)
        {
            
            _context = context;
        }
        public async Task<NormalRequest> CreateNormalRequest(NormalRequest normalRequest)
        {
            await _context.AddAsync(normalRequest);
            await _context.SaveChangesAsync();
            return normalRequest;
        }
    }
}