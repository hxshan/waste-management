using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WasteManagementApi.Controllers;
using WasteManagementApi.Dtos.DriverDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Tests.Controller
{
    public class AdminStaffControllerTests
    {

        private readonly AdminStaffController _controller;
        private readonly IDriverRepository _driverRepo;
        private readonly IAdminService _adminService;


        public AdminStaffControllerTests()
        {
            _driverRepo = A.Fake<IDriverRepository>();
            _adminService = A.Fake<IAdminService>();
            _controller = new AdminStaffController(_driverRepo, _adminService);

        }

        /*
         GetDrivers function
        */

        [Fact]
        public async Task GetDrivers_ReturnsOk_WithListOfDriverDtos()
        {
            var drivers = new List<Driver> {
                new Driver
            {
                Id = "driver1",
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                NIC = "NIC123456",
                PhoneNumber = "555-1234",
                Address = "123 Main St, Springfield",
                Email = "johndoe@example.com",
                EmergencyContact = "555-5678",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3000.00M,
                Department = "Waste Collection",
                LicenseNumber = "LIC12345",
                LicenceType = "Heavy Vehicle",
                LicenceExpiration = new DateTime(2025, 12, 31),
                TruckId = 1,
                AssignedAreaLat = 40.7128F,
                AssignedAreaLng = -74.0060F,
                AssignedAreaRadius = 10.5F,
                Collections = new List<Collection>()
            },
            new Driver
            {
                Id = "driver2",
                FirstName = "Jane",
                MiddleName = "B.",
                LastName = "Smith",
                NIC = "NIC654321",
                PhoneNumber = "555-4321",
                Address = "456 Elm St, Shelbyville",
                Email = "janesmith@example.com",
                EmergencyContact = "555-8765",
                DateOfHire = new DateTime(2019, 3, 20),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3200.50M,
                Department = "Recycling",
                LicenseNumber = "LIC98765",
                LicenceType = "Heavy Vehicle",
                LicenceExpiration = new DateTime(2026, 6, 30),
                TruckId = 2,
                AssignedAreaLat = 34.0522F,
                AssignedAreaLng = -118.2437F,
                AssignedAreaRadius = 12.0F,
                Collections = new List<Collection>()
            },
            };

            A.CallTo(() => _driverRepo.GetDriversAsync()).Returns(Task.FromResult(drivers));

            var result = await _controller.GetDrivers();

            //result shuld be Ok and be a list with 2 driver dtos
            result.Should().BeOfType<OkObjectResult>()
                .Which.Value.Should().BeOfType<List<DriverDetailsDto>>()
                .Which.Should().HaveCount(2);

        }

        [Fact]
        public async Task GetDrivers_ReturnsProblem()
        {
           
            A.CallTo(() => _driverRepo.GetDriversAsync()).Throws(new System.Exception());

            
            var result = await _controller.GetDrivers();

          
            result.Should().BeOfType<ObjectResult>()
                .Which.StatusCode.Should().Be(500);
        }

        /*
         Assign Drivers and Helpers functions
        */

        [Fact]
        public async Task AssignTruckDriver_ReturnsOk()
        {
            string driverId = "driver1";
            int truckId = 123;
            A.CallTo(() => _adminService.AssignTruckToDriver(driverId, truckId)).Returns(Task.CompletedTask);

            
            var result = await _controller.AssignTruckDriver(driverId, truckId);

            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task AssignTruckDriver_ReturnsNotFound() {

            string driverId = "driver1";
            int truckId = 123;
            A.CallTo(()=>_adminService.AssignTruckToDriver(driverId,truckId)).Throws<NullReferenceException>();

            var result = await _controller.AssignTruckDriver(driverId, truckId);

            result.Should().BeOfType<NotFoundObjectResult>();

        }

        [Fact]
        public async Task AssignTruckDriver_ReturnsBadRequest()
        {

            string driverId = "driver1";
            int truckId = 123;
            A.CallTo(() => _adminService.AssignTruckToDriver(driverId, truckId)).Throws<InvalidOperationException>();

            var result = await _controller.AssignTruckDriver(driverId, truckId);

            result.Should().BeOfType<BadRequestObjectResult>();

        }

        /*
         helper assignment part
        */

        [Fact]
        public async Task AssignTruckHelper_ReturnsOk()
        {
            string helperId = "helper1";
            int truckId = 123;
            A.CallTo(() => _adminService.AssignTruckToHelper(helperId, truckId)).Returns(Task.CompletedTask);


            var result = await _controller.AssignTruckDriver(helperId, truckId);

            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task AssignTruckHelper_ReturnsNotFound()
        {

            string helperId = "helper1";
            int truckId = 123;
            A.CallTo(() => _adminService.AssignTruckToDriver(helperId, truckId)).Throws<NullReferenceException>();

            var result = await _controller.AssignTruckDriver(helperId, truckId);

            result.Should().BeOfType<NotFoundObjectResult>();

        }

        [Fact]
        public async Task AssignTruckHelper_ReturnsBadRequest()
        {

            string helperId = "helper1";
            int truckId = 123;
            A.CallTo(() => _adminService.AssignTruckToDriver(helperId, truckId)).Throws<InvalidOperationException>();

            var result = await _controller.AssignTruckDriver(helperId, truckId);

            result.Should().BeOfType<BadRequestObjectResult>();

        }


    }
}
