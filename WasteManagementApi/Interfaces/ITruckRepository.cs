using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface ITruckRepository
    {
        Task<Truck> GetTruckByIdAsync(int id);
        Task<bool> IsAssingedToDriver(int id);
    }
}