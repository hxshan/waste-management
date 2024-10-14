using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            _controller = new AccountController(_userManager,_tokenService,_signInManager);
        }

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
                DateOfResignation = null, // Active driver, no resignation date
                IsActive = true,
                Salary = 3500.00m,
                Department = "Logistics",

                LicenseNumber = "AB1234567",
                LicenceType = "Heavy",
                LicenceExpiration = new DateTime(2025, 12, 31)
            };
            var driver = AccountMapper.MapDriverRegisterToDriver(registerDto);


            A.CallTo(() => _userManager.CreateAsync(driver, registerDto.Password)).Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(driver, "Driver")).Returns(IdentityResult.Success);
            A.CallTo(() => _tokenService.CreateToken(driver)).Returns(Task.FromResult("fake-jwt-token"));

            var result = await _controller.RegisterDriver(registerDto);

            result.Should().BeOfType<ObjectResult>();
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
                DateOfResignation = null, // Active driver, no resignation date
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

        }
}
