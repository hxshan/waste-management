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

        public async Task<Driver> GetDriverByIdAsync(string driverId)
        {
            var driver = await _context.Drivers.FirstOrDefaultAsync(x => x.Id == driverId);
            return driver;
        }

        public async Task<List<Driver>> GetDriversAsync()
        {
           var drivers=await _context.Drivers.ToListAsync();
           return drivers;
        }

        public async Task<Driver> UpdateDriverAsync(Driver driver)
        {
           var existingDriver = await GetDriverByIdAsync(driver.Id);

           foreach(var prop in typeof(Driver).GetProperties()){

                if(prop.Name == nameof(Driver)) continue;

                if(prop.CanWrite){
                    var newVal = prop.GetValue(driver);
                    prop.SetValue(existingDriver,newVal);
                }

           }
           await _context.SaveChangesAsync();
           return existingDriver;
        }
    }
}