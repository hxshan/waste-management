using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface IHelperRepository
    {
        
        Task<HelperStaff> GetHelperByIdAsync(string helperid);
        Task<bool> IsAssignedToTruck(string helperid);
        Task<HelperStaff> UpdateHelperAsync(HelperStaff helper);
    }
}