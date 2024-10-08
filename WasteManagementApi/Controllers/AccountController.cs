using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WasteManagementApi.Dtos.AccountDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Mappers;
using WasteManagementApi.Models;

namespace WasteManagementApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;



        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
        {

            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;

        }

        /*
         * Note:This endpoint is just for Authorization and other tests dont call it in the fronten
         * 
         * User any other Endpoint named regiter-[something]
         */
        [HttpPost("register")] 
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new User
                {
                    UserName = registerDto.FirstName,
                    Email = registerDto.Email
                };

                var CreatedUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return StatusCode(500, CreatedUser.Errors);
                    
                }

                var roleResult = await _userManager.AddToRoleAsync(appUser, "USER");

                if (!roleResult.Succeeded)
                {
                    return StatusCode(500, roleResult.Errors);

                }
                return Ok(new NewUserDto
                {
                    UserName = appUser.UserName,
                    Email = appUser.Email,
                    Token = await _tokenService.CreateToken(appUser)
                });

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }

        [HttpPost("register-driver")]
        public async Task<IActionResult> RegisterDriver([FromBody] DriverRegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var driver = AccountMapper.MapDriverRegisterToDriver(registerDto);

                var CreatedUser = await _userManager.CreateAsync(driver, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return StatusCode(500, CreatedUser.Errors);

                }

                var roleResult = await _userManager.AddToRoleAsync(driver, "Driver");

                if (!roleResult.Succeeded)
                {
                    return StatusCode(500, roleResult.Errors);

                }
                return Ok(new NewUserDto
                {
                    UserName = driver.UserName,
                    Email = driver.Email,
                    Token = await _tokenService.CreateToken(driver)
                });

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(X => X.Email == loginDto.Email.ToLower());

            if (user == null)
            {
                return Unauthorized("User not found/Password incorrect");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("User not found/Password incorrect");
            }
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token =  await _tokenService.CreateToken(user),
                Role = role
            });


        }

    }
}
