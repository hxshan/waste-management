using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Interfaces
{
    public interface IAdminService
    {
        Task AssignTruckToDriver(string driverId, int truckId);
    }
}