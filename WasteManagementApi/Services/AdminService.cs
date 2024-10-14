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
        private readonly IHelperRepository _helperRepo;
        public AdminService(IDriverRepository driverRepo, ITruckRepository truckRepo,IHelperRepository helperRepo)
        {
            _driverRepo =driverRepo;
            _truckRepo = truckRepo;
            _helperRepo = helperRepo;
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

        public async Task AssignTruckToHelper(string helperid, int truckId)
        {
            var helper = await _helperRepo.GetHelperByIdAsync(helperid);

            if(helper == null ){
                throw new NullReferenceException("Helper not found.");
            }

            var truck = await _truckRepo.GetTruckByIdAsync(truckId);

            if(truck == null ){
                throw new NullReferenceException("Truck not found.");
            }

            if(await _helperRepo.IsAssignedToTruck(helperid)){
                throw new InvalidOperationException("Helper is already assigned to another Truck.");
            }

            helper.TruckId = truckId;

            await _helperRepo.UpdateHelperAsync(helper);

        }
    }
}