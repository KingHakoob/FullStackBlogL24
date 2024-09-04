using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class BlogController : ControllerBase
{
    private readonly BlogItemService _data;

    public BlogController(BlogItemService dataFromService) {
        _data = dataFromService;
    }


    [HttpPost("AddBlogItem")]
    public bool AddBlogItem(BlogItemModel newBlogItem) {
        return _data.AddBlogItem(newBlogItem);
    }

    [HttpGet("GetAllBlogItems")]
    public IEnumerable<BlogItemModel> GetAllBlogItems() {
        return _data.GetAllBlogItems();
    }

    [HttpGet("GetBlogItemsByCategory/{category}")]
    public IEnumerable<BlogItemModel> GetBlogItemsByCategory(string category) {
        return _data.GetBlogItemsByCategory(category);
    }

    [HttpGet("GetBlogItemsByTag/{tag}")]
    public List<BlogItemModel> GetBlogItemsByTag(string tag) {
        return _data.GetBlogItemsByTag(tag);
    }

    [HttpGet("GetBlogItemsByDate/{date}")]

    public IEnumerable<BlogItemModel> GetBlogItemsByDate(string date) {
        return _data.GetBlogItemsByDate(date);
    }

    [HttpPost("UpdateBlogItem")]
    public bool UpdateBlogItem(BlogItemModel blogUpdate) {
        return _data.UpdateBlogItem(blogUpdate);
    }

    [HttpPost("DeleteBlogItem/{blogDelete}")]
    public bool DeleteBlogItem(BlogItemModel blogDelete) {
        return _data.DeleteBlogItem(blogDelete);
    }

    [HttpGet("GetPublishedItems")]
    public IEnumerable<BlogItemModel> GetPublishedBlogItems() {
        return _data.GetPublishedBlogItems();
    }

    [HttpGet("GetBlogItemsByUserId/{userId}")]
    public IEnumerable<BlogItemModel> GetBlogItemsByUserId(int userId) {
        return _data.GetBlogItemsByUserId(userId);
    }
}
