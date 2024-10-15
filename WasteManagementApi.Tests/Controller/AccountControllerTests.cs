using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WasteManagementApi.Controllers;
using WasteManagementApi.Dtos.AccountDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Mappers;
using WasteManagementApi.Models;
using WasteManagementApi.Services;

namespace WasteManagementApi.Tests.Controller
{
    public class AccountControllerTests
    {
        private readonly AccountController _controller;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;

        public AccountControllerTests()
        {
            _userManager = A.Fake<UserManager<User>>();
            _tokenService = A.Fake<ITokenService>();
            _signInManager = A.Fake<SignInManager<User>>();
            _controller = new AccountController(_userManager, _tokenService, _signInManager);
        }


        //ADMIN STAFF

        [Fact]
        public async Task RegisterAdmin_ReturnsOkResult()
        {
            var registerDto = new AdminRegisterDto
            {
                
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",
                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = new DateTime(2020, 6, 15),
                IsActive = true,
                Salary = 3500,
                Department = "Logistics",


            };
            var admin = AccountMapper.MapAdminRegisterToAdmin(registerDto);


            A.CallTo(() => _userManager.CreateAsync(A<AdminStaff>._, registerDto.Password)).Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(A<AdminStaff>._, "Admin")).Returns(IdentityResult.Success);
            A.CallTo(() => _tokenService.CreateToken(A<AdminStaff>._)).Returns(Task.FromResult("fake-jwt-token"));


            var result = await _controller.RegisterAdmin(registerDto);
         

            result.Should().BeOfType<OkObjectResult>()
                .Which.Value.Should().BeOfType<NewUserDto>()
                .Which.Should().BeEquivalentTo(new NewUserDto {
                    UserName = admin.UserName,
                    Email = admin.Email,
                    Token = await _tokenService.CreateToken(admin),
                });
        }

        [Fact]
        public async Task RegisterAdmin_ReturnBadObjectResult()
        {

            var registerDto = new AdminRegisterDto
            {

            };
            _controller.ModelState.AddModelError("Error", "Invalid Data");

            var result = await _controller.RegisterAdmin(registerDto);


            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task RegisterAdmin_ReturnsProblem()
        {
            var registerDto = new AdminRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",

                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",


            };
            var driver = AccountMapper.MapAdminRegisterToAdmin(registerDto);

            A.CallTo(() => _userManager.CreateAsync(driver, registerDto.Password)).Returns(IdentityResult.Failed(new IdentityError { Description = "Error" }));


            var result = await _controller.RegisterAdmin(registerDto);


            result.Should().BeOfType<ObjectResult>().Which.StatusCode.Should().Be(500);
        }


        //DRIVER REGSSTRATION

        [Fact]
        public async Task RegisterDriver_ReturnsOkResult()
        {

            var registerDto = new DriverRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",

                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",

                LicenseNumber = "AB1234567",
                LicenceType = "Heavy",
                LicenceExpiration = new DateTime(2025, 12, 31)
            };
           


            var driver = AccountMapper.MapDriverRegisterToDriver(registerDto);
           


            A.CallTo(() => _userManager.CreateAsync(A<Driver>._, registerDto.Password)).Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(A<Driver>._, "Driver")).Returns(IdentityResult.Success);
            A.CallTo(() => _tokenService.CreateToken(A<Driver>._)).Returns(Task.FromResult("fake-jwt-token"));

            var result = await _controller.RegisterDriver(registerDto);
            Console.WriteLine(result);

            result.Should().BeOfType<OkObjectResult>()
                .Which.Value.Should().BeOfType<NewUserDto>()
                .Which.Should().BeEquivalentTo(new NewUserDto
                {
                    UserName = driver.UserName,
                    Email = driver.Email,
                    Token = await _tokenService.CreateToken(driver),
                });
        }


        [Fact]
        public async Task RegisterDriver_ReturnBadObjectResult()
        {

            var registerDto = new DriverRegisterDto
            {

            };
            _controller.ModelState.AddModelError("Error", "Invalid Data");

            var result = await _controller.RegisterDriver(registerDto);


            result.Should().BeOfType<BadRequestObjectResult>();
        }



        [Fact]
        public async Task RegisterDriver_ReturnsProblem()
        {
            var registerDto = new DriverRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",

                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",

                LicenseNumber = "AB1234567",
                LicenceType = "Heavy",
                LicenceExpiration = new DateTime(2025, 12, 31)
            };
            var driver = AccountMapper.MapDriverRegisterToDriver(registerDto);

            A.CallTo(() => _userManager.CreateAsync(driver, registerDto.Password)).Returns(IdentityResult.Failed(new IdentityError { Description = "Error" }));


            var result = await _controller.RegisterDriver(registerDto);


            result.Should().BeOfType<ObjectResult>().Which.StatusCode.Should().Be(500);
        }

        //HELPERSSs

        [Fact]
        public async Task RegisterHelper_ReturnsOkResult()
        {
            var registerDto = new HelperRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",

                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null,
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",

            };
            var helper = AccountMapper.MapHelperRegisterToHelper(registerDto);


            A.CallTo(() => _userManager.CreateAsync(A<HelperStaff>._, registerDto.Password)).Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(A<HelperStaff>._, "Helper")).Returns(IdentityResult.Success);
            A.CallTo(() => _tokenService.CreateToken(A<HelperStaff>._)).Returns(Task.FromResult("fake-jwt-token"));

            var result = await _controller.RegisterHelper(registerDto);

                result.Should().BeOfType<OkObjectResult>()
                   .Which.Value.Should().BeOfType<NewUserDto>()
                   .Which.Should().BeEquivalentTo(new NewUserDto
                   {
                       UserName = helper.UserName,
                       Email = helper.Email,
                       Token = await _tokenService.CreateToken(helper),
                   });
        }

        [Fact]
        public async Task RegisterHelper_ReturnBadObjectResult()
        {

            var registerDto = new HelperRegisterDto
            {

            };
            _controller.ModelState.AddModelError("Error", "Invalid Data");

            var result = await _controller.RegisterHelper(registerDto);


            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task RegisterHelper_ReturnsProblem()
        {
            var registerDto = new HelperRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",

                EmergencyContact = "Jane Doe - 555-987-6543",
                DateOfHire = new DateTime(2020, 6, 15),
                DateOfResignation = null, // Active driver, no resignation date
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",


            };
            var helper = AccountMapper.MapHelperRegisterToHelper(registerDto);

            A.CallTo(() => _userManager.CreateAsync(helper, registerDto.Password)).Returns(IdentityResult.Failed(new IdentityError { Description = "Error" }));


            var result = await _controller.RegisterHelper(registerDto);


            result.Should().BeOfType<ObjectResult>().Which.StatusCode.Should().Be(500);
        }

        //Cliebnts

        [Fact]
        public async Task RegisterClient_ReturnsOkResult()
        {
            var registerDto = new ClientRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield"


            };
            var client = AccountMapper.MapClientRegisterToClient(registerDto);


            A.CallTo(() => _userManager.CreateAsync(A<Client>._, registerDto.Password)).Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(A<Client>._, "Client")).Returns(IdentityResult.Success);
            A.CallTo(() => _tokenService.CreateToken(A<Client>._)).Returns(Task.FromResult("fake-jwt-token"));

            var result = await _controller.RegisterClient(registerDto);

            result.Should().BeOfType<OkObjectResult>()
               .Which.Value.Should().BeOfType<NewUserDto>()
               .Which.Should().BeEquivalentTo(new NewUserDto
               {
                   UserName = client.UserName,
                   Email = client.Email,
                   Token = await _tokenService.CreateToken(client),
               });
        }

        [Fact]
        public async Task RegisterClient_ReturnBadObjectResult()
        {

            var registerDto = new ClientRegisterDto
            {

            };
            _controller.ModelState.AddModelError("Error", "Invalid Data");

            var result = await _controller.RegisterClient(registerDto);


            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task RegisterClient_ReturnsProblem()
        {
            var registerDto = new ClientRegisterDto
            {
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Password = "SecurePass123!",
                PhoneNumber = "555-123-4567",
                NIC = "123456789V",
                Address = "123 Elm Street, Springfield",




            };
            var client = AccountMapper.MapClientRegisterToClient(registerDto);

            A.CallTo(() => _userManager.CreateAsync(client, registerDto.Password)).Returns(IdentityResult.Failed(new IdentityError { Description = "Error" }));


            var result = await _controller.RegisterClient(registerDto);


            result.Should().BeOfType<ObjectResult>().Which.StatusCode.Should().Be(500);
        }

    }
}
