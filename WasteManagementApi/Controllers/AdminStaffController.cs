using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Controllers
{
    [Route("api/adminstaff")]
    [ApiController]
    public class AdminStaffController:ControllerBase
    {
        private readonly IDriverRepository _driverRepo;
        public AdminStaffController(IDriverRepository driverRepo)
        {
            _driverRepo = driverRepo;
        }

        [HttpGet("drivers")]
        //[Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetDrivers(){
            try{

                var drivers = await _driverRepo.GetDriversAsync();
                return Ok(drivers);
            }catch(Exception ex){
                return Problem("Internal server error. Please try again later.");
            }
        }

    }
}