using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Interfaces;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using api;

namespace CoffeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UsersController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(User user)
        {
            user.Password = HashPassword(user.Password);

            try
            {
                await _userRepository.AddUserAsync(user);
                await _userRepository.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Username already exists");
            }

            return Ok("User registered successfully");
        }

        [HttpPost("token")]
        public async Task<ActionResult<Token>> Login([FromForm] string username, [FromForm] string password)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null || !VerifyPassword(password, user.Password))
            {
                return Unauthorized("Incorrect username or password");
            }

            var token = CreateAccessToken(user.Username);
            return Ok(new Token { AccessToken = token, TokenType = "bearer" });
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }

        private bool VerifyPassword(string plainPassword, string hashedPassword)
        {
            return HashPassword(plainPassword) == hashedPassword;
        }

        private string CreateAccessToken(string username)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
            var audience = jwtSettings["CoffeeApiAudience"];

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"])),
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
