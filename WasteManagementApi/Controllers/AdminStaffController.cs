using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Dtos.DriverDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Mappers;
using WasteManagementApi.Models;
using WasteManagementApi.Repositories;
using WasteManagementApi.Services;

namespace WasteManagementApi.Controllers
{
    [Route("api/adminstaff")]
    [ApiController]
    public class AdminStaffController:ControllerBase
    {
        private readonly IDriverRepository _driverRepo;
        private readonly IAdminService _adminService;
        public AdminStaffController(IDriverRepository driverRepo,IAdminService service)
        {
            _driverRepo = driverRepo;
            _adminService = service;
        }

        [HttpGet("drivers")]
        //[Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetDrivers(){
            try{
                var drivers = await _driverRepo.GetDriversAsync();
                List<DriverDetailsDto> driverdtos = drivers.Select(x => DriverMapper.MapDriverToDriverDetailsDto(x)).ToList();
                return Ok(driverdtos);
            }catch(Exception ex){
                return Problem("Internal server error. Please try again later.");
            }
        }

        [HttpPut("{driverid}/assign-truckdriver/{truckid}")]
        public async Task<IActionResult> AssignTruckDriver(string driverid,int truckid){
            
            try{
               await _adminService.AssignTruckToDriver(driverid, truckid);
              return Ok("Driver Assigned Successfully");
            }catch(NullReferenceException ex){
                return NotFound(ex.Message);
            }catch(InvalidOperationException ex){
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{helperid}/assign-truckhelper/{truckid}")]
        public async Task<IActionResult> AssignTruckHelper(string helperid,int truckid){
            
            try{
               await _adminService.AssignTruckToHelper(helperid, truckid);
              return Ok("Helper Assigned Successfully");
            }catch(NullReferenceException ex){
                return NotFound(ex.Message);
            }catch(InvalidOperationException ex){
                return BadRequest(ex.Message);
            }
        }

    }
}