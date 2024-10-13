using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Interfaces;

namespace WasteManagementApi.Services
{
    public class AdminService:IAdminService
    {
        private readonly IDriverRepository _driverRepo;
        private readonly ITruckRepository _truckRepo;
        public AdminService(IDriverRepository driverRepo, ITruckRepository truckRepo)
        {
            _driverRepo =driverRepo;
            _truckRepo = truckRepo;
        }

        
        public async Task AssignTruckToDriver(string driverId, int truckId){
            var driver = await _driverRepo.GetDriverByIdAsync(driverId);

            if(driver == null ){
                throw new NullReferenceException("Driver not found.");
            }

             var truck = await _truckRepo.GetTruckByIdAsync(truckId);

            if(truck == null ){
                throw new NullReferenceException("Truck not found.");
            }

            if(await _truckRepo.IsAssingedToDriver(truckId)){
                throw new InvalidOperationException("Truck already assigned to a driver.");
            }

            driver.TruckId =truckId;
        
            await _driverRepo.UpdateDriverAsync(driver);

        }
    }
}