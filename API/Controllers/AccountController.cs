using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly tokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, tokenService tokenService){
            _tokenService = tokenService;

            _userManager = userManager;
        }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if(user == null) return Unauthorized(); 

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if(result)
            {
                return CreateUserObject(user); 
            }
            return Unauthorized();
    }


        [AllowAnonymous]
        [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){

        if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
        {
            ModelState.AddModelError("UserName", "UserName is already Taken");
            return BadRequest("UserName is already taken");
        }

        if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            ModelState.AddModelError("email", "Email is already Taken");
            return ValidationProblem();
        }

        var user = new AppUser{
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.UserName
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if(result.Succeeded){
            return CreateUserObject(user); 
        }

        return BadRequest(result.Errors);
    }
    
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser(){
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        return CreateUserObject(user); 
    }

            private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}