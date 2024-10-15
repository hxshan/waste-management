using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Messaging;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<NormalRequest>> GetRequests()
        {
             var requests = await _context.CollectionRequests.OfType<NormalRequest>().ToListAsync();
            return requests;
        }

        public async Task<List<NormalRequest>> GetRequestsByClientId(string clientId)
        {
            var requests = await _context.NormalRequests.Where(x => x.ClientId == clientId).ToListAsync();
            return requests;
        }


    }
}