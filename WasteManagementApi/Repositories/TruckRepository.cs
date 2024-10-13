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
    public class TruckRepository : ITruckRepository
    {
        private readonly ApplicationDbContext _context;
        public TruckRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Truck> GetTruckByIdAsync(int id)
        {
            var truck = await _context.Trucks.FindAsync(id);
            return truck;
        }

        public async Task<bool> IsAssingedToDriver(int id)
        {
            var truck = await _context.Trucks.Include(x=>x.Driver).FirstOrDefaultAsync(x => x.Id == id);
            if(truck.Driver != null){
                return true;
            }
            return false;

        }
    }
}