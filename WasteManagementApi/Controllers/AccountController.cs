using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WasteManagementApi.Dtos.AccountDtos;
using WasteManagementApi.Dtos.clientDtos;
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
        // [HttpPost("register")] 
        // public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        // {
        //     try
        //     {
        //         if (!ModelState.IsValid)
        //         {
        //             return BadRequest(ModelState);
        //         }
        //         var appUser = new User
        //         {
        //             UserName = registerDto.FirstName,
        //             Email = registerDto.Email
        //         };

        //         var CreatedUser = await _userManager.CreateAsync(appUser, registerDto.Password);

        //         if (!CreatedUser.Succeeded)
        //         {
        //             return StatusCode(500, CreatedUser.Errors);

        //         }

        //         var roleResult = await _userManager.AddToRoleAsync(appUser, "USER");

        //         if (!roleResult.Succeeded)
        //         {
        //             return StatusCode(500, roleResult.Errors);

        //         }
        //         return Ok(new NewUserDto
        //         {
        //             UserName = appUser.UserName,
        //             Email = appUser.Email,
        //             Token = await _tokenService.CreateToken(appUser)
        //         });

        //     }
        //     catch (Exception e)
        //     {
        //         return StatusCode(500, e);
        //     }

        // }

        [HttpPost("register-driver")]
        public async Task<IActionResult> RegisterDriver([FromBody] DriverRegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Data Format");
                }
                var driver = AccountMapper.MapDriverRegisterToDriver(registerDto);

                var CreatedUser = await _userManager.CreateAsync(driver, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return Problem("Error When Creating the User");

                }

                var roleResult = await _userManager.AddToRoleAsync(driver, "Driver");

                if (!roleResult.Succeeded)
                {
                    return Problem("Error When Assigning the User their Role");

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
                return StatusCode(500, e.Message);
            }

        }



        [HttpPost("register-helper")]
        public async Task<IActionResult> RegisterHelper([FromBody] HelperRegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Data Format");
                }
                var helper = AccountMapper.MapHelperRegisterToHelper(registerDto);

                var CreatedUser = await _userManager.CreateAsync(helper, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return StatusCode(500, CreatedUser.Errors);

                }

                var roleResult = await _userManager.AddToRoleAsync(helper, "Helper");

                if (!roleResult.Succeeded)
                {
                    return StatusCode(500, roleResult.Errors);

                }
                return Ok(new NewUserDto
                {
                    UserName = helper.UserName,
                    Email = helper.Email,
                    Token = await _tokenService.CreateToken(helper)
                });

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }


        [HttpPost("register-client")]
        public async Task<IActionResult> RegisterClient([FromBody] ClientRegisterDto registerDto)
        {

            try
            {
                Console.Write(registerDto);
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Data Format");
                }
                var client = AccountMapper.MapClientRegisterToClient(registerDto);

                var CreatedUser = await _userManager.CreateAsync(client, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return StatusCode(500, CreatedUser.Errors);

                }

                var roleResult = await _userManager.AddToRoleAsync(client, "Client");

                if (!roleResult.Succeeded)
                {
                    return StatusCode(500, roleResult.Errors);

                }
                return Ok(new NewUserDto
                {
                    UserName = client.UserName,
                    Email = client.Email,
                    Token = await _tokenService.CreateToken(client)
                });

            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }

        }
        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] AdminRegisterDto registerDto)
        {

            try
            {
                Console.Write(registerDto);
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid Data Format");
                }
                var admin = AccountMapper.MapAdminRegisterToAdmin(registerDto);

                var CreatedUser = await _userManager.CreateAsync(admin, registerDto.Password);

                if (!CreatedUser.Succeeded)
                {
                    return StatusCode(500, CreatedUser.Errors);

                }

                var roleResult = await _userManager.AddToRoleAsync(admin, "Admin");

                if (!roleResult.Succeeded)
                {
                    return StatusCode(500, roleResult.Errors);

                }
                return Ok(new NewUserDto
                {
                    UserName = admin.UserName,
                    Email = admin.Email,
                    Token = await _tokenService.CreateToken(admin)
                });

            }
            catch (Exception e)
            {
                return Problem(e.Message);
            } 

        }

        [HttpPut("updateclient/{id}")]
        public async Task<IActionResult> UpdateClient(string id, ClientUpdateDto UpdateDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound($"User with Id {id} not found.");
            }

            // Check if the email is being updated
            if (user.Email != UpdateDto.Email)
            {
                // Check if the new email is already taken by another user
                var existingUserWithEmail = await _userManager.FindByEmailAsync(UpdateDto.Email);
                if (existingUserWithEmail != null && existingUserWithEmail.Id != id)
                {
                    return BadRequest("Email is already in use by another account.");
                }

                // Update the email if not in use
                var emailResult = await _userManager.SetEmailAsync(user, UpdateDto.Email);
                if (!emailResult.Succeeded)
                {
                    return BadRequest(emailResult.Errors);
                }
            }

            // Update other fields
            user.FirstName = UpdateDto.FirstName;
            user.MiddleName = UpdateDto.MiddleName;
            user.LastName = UpdateDto.LastName;
            user.PhoneNumber = UpdateDto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User updated successfully.");
        }

        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ClientPassDto changePasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("User not found.");

            // Verify the old password
            var isOldPasswordValid = await _userManager.CheckPasswordAsync(user, changePasswordDto.oldPassword);
            if (!isOldPasswordValid)
                return BadRequest("The current password is incorrect.");

            // Check if the new password is different from the old one
            if (changePasswordDto.oldPassword == changePasswordDto.NewPassword)
                return BadRequest("The new password must be different from the current password.");

            // Validate password complexity
            var passwordValidator = new PasswordValidator<User>();
            var passwordCheck = await passwordValidator.ValidateAsync(_userManager, null, changePasswordDto.NewPassword);

            if (!passwordCheck.Succeeded)
                return BadRequest(passwordCheck.Errors.Select(e => e.Description));


            // Change password
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.oldPassword, changePasswordDto.NewPassword);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Password updated successfully.");
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

            return Ok(new UserLoginDto
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = role
            });


        }

    }
}
