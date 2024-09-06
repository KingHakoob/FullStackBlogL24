using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class UserService : ControllerBase
{
    private readonly DataContext _context;

    public UserService(DataContext context) {
        _context = context;   
    }

    
    public bool DoesUserExist(string username) {
        return _context.UserInfo.SingleOrDefault(user => user.Username == username) != null;
    }

    public bool AddUser(CreateAccountDTO userToAdd) {
        bool result = false;
        if(!DoesUserExist(userToAdd.Username)) {
            var newHashedPassword = HashPassword(userToAdd.Password);
            UserModel user = new() {
                Id = userToAdd.Id,
                Username = userToAdd.Username,
                Salt = newHashedPassword.Salt,
                Hash = newHashedPassword.Hash
            };

            _context.Add(user);
            result = _context.SaveChanges() != 0;
        }
        return result;
    }

    public PasswordDTO HashPassword(string password) {
        byte[] SaltBytes = new byte[64];
        var provider = new RNGCryptoServiceProvider();
        provider.GetNonZeroBytes(SaltBytes); 
        var Salt = Convert.ToBase64String(SaltBytes);
        var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes, 10000);
        var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));

        PasswordDTO newHashedPassword = new() {
            Salt = Salt,
            Hash = Hash
        };

        return newHashedPassword;
    }

    public bool VerifyUserPassword(string? Password, string?StoredHash, string? StoredSalt) {
        var SaltBytes = Convert.FromBase64String(StoredSalt);
        var rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password,SaltBytes, 10000);
        var newHash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

        return newHash == StoredHash;
    }

    public IEnumerable<UserModel> GetAllUsers() {
       return _context.UserInfo;
    }

    public UserModel GetAllUserDataByUsername(string username) {
        return _context.UserInfo.FirstOrDefault(user => user.Username == username);
    }

    public IActionResult Login(LoginDTO user) {
        IActionResult result = Unauthorized();
        if(DoesUserExist(user.UserName)) {

            UserModel foundUser = GetAllUserDataByUsername(user.UserName);
            if(VerifyUserPassword(user.Password, foundUser.Hash, foundUser.Salt)) {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("letsaddmorereallylongkeysuperSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                result = Ok(new { Token = tokenString });
            }
        }
        return result;
    }

    public UserIdDTO GetUserIdDTOByUserName(string username) {
        UserModel user = _context.UserInfo.SingleOrDefault(user => user.Username == username);
        return new UserIdDTO {
            UserId = user.Id,
            Username = user.Username
        };
    }

    public UserModel GetUserByUsername(string? username) {
        return _context.UserInfo.SingleOrDefault(user => user.Username == username);
    }

    public bool DeleteUser(string userToDelete) {
        UserModel foundUser = GetUserByUsername(userToDelete);
        bool result = false;
        if(foundUser != null) {
            _context.Remove<UserModel>(foundUser);
            result = _context.SaveChanges() != 0;
        }
        return result;
    }

    public UserModel GetUserById(int id) {
        return _context.UserInfo.SingleOrDefault(user => user.Id == id);
    }

    public bool UpdateUser(int id, string username) {
       UserModel foundUser = GetUserById(id);
       bool result = false;
       if(foundUser != null) {
        foundUser.Username = username;
        _context.Update<UserModel>(foundUser);
        result = _context.SaveChanges() !=0;
       }
       return result;
    }
}
