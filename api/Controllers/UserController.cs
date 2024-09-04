using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
  private readonly UserService _data;

  public UserController(UserService dataFromService) {
    _data = dataFromService;
  }


  [HttpPost("AddUser")]
  public bool AddUser(CreateAccountDTO userToAdd) {
    return _data.AddUser(userToAdd);
  }

  [HttpGet("GetAllUsers")]
  public IEnumerable<UserModel> GetAllUsers() {
    return _data.GetAllUsers();
  }

  [HttpGet("GetUserByUsername/{username}")]
  public UserIdDTO GetUserIdDTOByUserName(string username) {
    return _data.GetUserIdDTOByUserName(username);
  }

  [HttpPost("Login")]
  public IActionResult Login([FromBody] LoginDTO User) {
    return _data.Login(User);
  }

  [HttpPost("DeleteUser/{userToDelete}")]
  public bool DeleteUser(string userToDelete) {
    return _data.DeleteUser(userToDelete);
  }

  [HttpPost("UpdateUser")]
  public bool UpdateUser(int id, string username) {
    return _data.UpdateUser(id, username);
  }
}
