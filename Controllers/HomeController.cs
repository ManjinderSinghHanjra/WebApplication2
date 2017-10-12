using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            //List<UserModel> users = (List<UserModel>)System.Web.HttpContext.Current.Application["users"];
            //return View(users);
            return View();
        }

        public ActionResult Details(int draw, int start, int length)  // Todo:
        {
            //List<UserModel> users = (List<UserModel>)System.Web.HttpContext.Current.Application["users"];
            //var result = new { recordsTotal = users.Count, recordsFiltered = users.Count, data = users };
            String searchParam = Request.Params["search[value]"];
            var result = new { data = search(searchParam, start, length) };
            return Json(result);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        private List<UserModel> search(string searchParams, int start, int length)
        {
            List<UserModel> tempList = new List<UserModel>();
            List<UserModel> users = (List<UserModel>) HttpContext.Application["users"];
            foreach(UserModel user in users)
            {
                Regex regex = new Regex(searchParams);
                if(regex.IsMatch(user.EmailID))
                {
                    tempList.Add(user);
                }
            }
            return tempList;
        }

    }
}