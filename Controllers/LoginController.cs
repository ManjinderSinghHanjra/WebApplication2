using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class LoginController : Controller
    {
        string email = "admin";
        string pass = "admin";
        // GET: /Login/

        public ActionResult SignUp()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult LoginCheck(string emailID, string password)
        {
            UserModel tempUser = new UserModel();
            tempUser = (UserModel)(@Session["user"]);
            tempUser.Auth = true;
            System.Console.Write("Entered inside LoginCheck");
            if (emailID.Equals("admin") && password.Equals("admin"))
            {
                @Session["user"] = tempUser;
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return Content("Sorry, email and/or password were incorrect! Try again.");
            }
        }
    }
}