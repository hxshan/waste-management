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
    public class HelperRepository:IHelperRepository
    {

        private readonly ApplicationDbContext _context;
        public HelperRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<HelperStaff> GetHelperByIdAsync(string helperid)
        {
            var helper = await _context.HelperStaff.FirstOrDefaultAsync(x => x.Id == helperid);
            return helper;
        }

        public async Task<bool> IsAssignedToTruck(string helperid)
        {
            var helper = await GetHelperByIdAsync(helperid);
            if(helper.TruckId != null){
                return true;
            }
            return false;
        }

         public async Task<HelperStaff> UpdateHelperAsync(HelperStaff helper)
        {
           var existingHelper = await GetHelperByIdAsync(helper.Id);

           foreach(var prop in typeof(HelperStaff).GetProperties()){

                if(prop.Name == nameof(HelperStaff)) continue;

                if(prop.CanWrite){
                    var newVal = prop.GetValue(helper);
                    prop.SetValue(existingHelper,newVal);
                }

           }
           await _context.SaveChangesAsync();
           return existingHelper;
        }
    }
}