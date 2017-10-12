using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public ActionResult Details()  // Todo:
        {
            List<UserModel> users = (List<UserModel>)System.Web.HttpContext.Current.Application["users"];
            var result = new { recordsTotal = users.Count, recordsFiltered = users.Count, data = users };
            return Json(result);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}