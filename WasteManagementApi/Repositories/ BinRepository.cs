using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WasteManagementApi.Data;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Repositories
{
    public class BinRepository : IBinRepository
    {
        private readonly ApplicationDbContext _context;

        public BinRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Bin>> GetAllBinsAsync()
        {
            return await _context.Bins.ToListAsync();
        }

        public async Task<Bin> GetBinByIdAsync(int id)
        {
            return await _context.Bins.FindAsync(id);
        }

        public async Task<Bin> CreateBinAsync(Bin bin)
        {
            _context.Bins.Add(bin);
            await _context.SaveChangesAsync();
            return bin;
        }

        public async Task UpdateBinAsync(Bin bin)
        {
            _context.Entry(bin).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
      


        public async Task DeleteBinAsync(int id)
        {
            var bin = await _context.Bins.FindAsync(id);
            if (bin != null)
            {
                _context.Bins.Remove(bin);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Bin>> GetBinsByClientIdAsync(string id)
        {
             var bin = await _context.Bins.Where(b=>b.ClientId == id).ToListAsync();
             return bin;
        }
    }
}