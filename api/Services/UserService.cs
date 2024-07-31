using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.DTO;
using api.Services.Context;

namespace api.Services;

public class UserService
{
    private readonly DataContext _context;

    public UserService(DataContext context)
    {
        _context = context;   
    }

    //helper functions to help us chekc if the user exist
    //DoesUserExist
    public bool DoesUserExist(string username)
    {
        //check our tables to see if the suer name exist
        //if one item matches our condition that item will be returned
        //if no items matches it will return null
        //if multiple items match it will return an error
    }


//adding user logic
    public bool AddUser(CreateAccountDTO userToAdd)
    {
        //if the user already exist
        //if the do not exist we add an account
        //Else throw a false
    }
}
