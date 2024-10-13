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
    public class DriverRepository : IDriverRepository
    {
        private readonly ApplicationDbContext _context;
        public DriverRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Driver>> GetDriversAsync()
        {
           var drivers=await _context.Drivers.ToListAsync();
           return drivers;
        }
    }
}