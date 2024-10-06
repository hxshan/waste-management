﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WasteManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController:ControllerBase
    {

        public TestController() { }


        [HttpGet]
        [Authorize(Roles ="User")]
        public ActionResult Get() {

            return Ok("Authed");
        }
    }
}
