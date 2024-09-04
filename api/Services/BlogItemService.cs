using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services.Context;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class BlogItemService : ControllerBase
{
    private readonly DataContext _context;

    public BlogItemService(DataContext context) {
            _context = context;
    }


    public bool AddBlogItem(BlogItemModel newBlogItem) {
        _context.Add(newBlogItem);
        return _context.SaveChanges() != 0;
    }

    public bool DeleteBlogItem(BlogItemModel blogDelete) {
        _context.Update<BlogItemModel>(blogDelete);
        return _context.SaveChanges() != 0;
    }

     public IEnumerable<BlogItemModel> GetAllBlogItems() {
        return _context.BlogInfo;
    }

    public IEnumerable<BlogItemModel> GetBlogItemsByCategory(string category) {
        return _context.BlogInfo.Where(item => item.Category == category);
    }

    public IEnumerable<BlogItemModel> GetBlogItemsByDate(string date) {
        return _context.BlogInfo.Where(item => item.Date == date);
    }

    public List<BlogItemModel> GetBlogItemsByTag(string tag) {
        List<BlogItemModel> allBlogsWithTag = new List<BlogItemModel>();
        var allItems = GetAllBlogItems().ToList();
        for(int i = 0; i < allItems.Count; i++)
        {
            BlogItemModel item = allItems[i];
            var itemArr = item.Tag.Split(',');

            for(int j = 0; j < itemArr.Length; j++) {
                if(itemArr[j].Contains(tag)) {
                    allBlogsWithTag.Add(item);
                    break;
                }
            }
        }
        return allBlogsWithTag;
    }

    public bool UpdateBlogItem(BlogItemModel blogUpdate) {
        _context.Update<BlogItemModel>(blogUpdate);
        return _context.SaveChanges() != 0;
    }

    public IEnumerable<BlogItemModel> GetPublishedBlogItems() {
        return _context.BlogInfo.Where(item => item.IsPublished);
    }

    public IEnumerable<BlogItemModel> GetBlogItemsByUserId(int userId) {
        return _context.BlogInfo.Where(item => item.UserId == userId);
    }
}
