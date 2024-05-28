using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using WebCafeShop.Backend;
using WebCafeShop.Backend.Models;

namespace webapi.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DbCafeOrderContext _db;
        public AuthController(DbCafeOrderContext context)
        {
            _db = context;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            var user = new TBUser();
            return new JsonResult(user);
        }

        [HttpGet("GetUserInfo")]
        public async Task<IActionResult> GetUserInfo(int id)
        {
            var user = await _db.TBUsers.AsNoTracking().Where(x=>x.Id == id).FirstOrDefaultAsync();
            return new JsonResult(user);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(TBUser _user)
        {
            PasswordHasher<TBUser> passwordHasher = new PasswordHasher<TBUser>();

            var hashedPassword = passwordHasher.HashPassword(_user, _user.Password);


            var user = await _db.TBUsers.Where(x=>x.Username == _user.Username).FirstOrDefaultAsync();

            if (user != null) { 
            if (passwordHasher.VerifyHashedPassword(_user, user.Password, _user.Password) == PasswordVerificationResult.Success)
                return new JsonResult(user.Id);
            else
                return new JsonResult(null);
            }
            else { return new JsonResult(null); }
        }   

        [HttpPost("Register")]
        public async Task<IActionResult> Register(TBUser user)
        {
            try
            {
                var oldUser = await _db.TBUsers.Where(x=>x.Username ==user.Username).FirstOrDefaultAsync();
                if (oldUser != null)
                {
                    return new JsonResult(null);
                }
                else
                {
                    PasswordHasher<TBUser> passwordHasher = new PasswordHasher<TBUser>();
                    user.Password = passwordHasher.HashPassword(user, user.Password);

                    await _db.TBUsers.AddAsync(user);
                    await _db.SaveChangesAsync();

                    return new JsonResult(user.Id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }


        [HttpPost("SaveUserData")]
        public async Task<IActionResult> SaveUserData(TBUser user)
        {
            try
            {
                _db.TBUsers.Update(user);
                await _db.SaveChangesAsync();
                return new JsonResult("Сохранено");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
    }
}
