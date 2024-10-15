using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Interfaces;

namespace WasteManagementApi.Controllers
{
    [Route("api/driver")]
    [ApiController]
    public class DriverController:ControllerBase
    {
        
        private readonly INormalRequestRepository _normalReqRepo;

        public DriverController(INormalRequestRepository normalReqRepo)
        {
            _normalReqRepo=normalReqRepo;
        }

        [HttpGet("collections")]
        public async Task<IActionResult> GetCollections()
        {
            var collections = await _normalReqRepo.GetAllRequests();
            return Ok(collections);

        }

    }
}