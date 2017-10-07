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
        const int CODE_0 = 0;
        const int CODE_1 = 1;
        const int CODE_2 = 2;
        string email = "admin";
        string pass = "admin";
        // GET: /Login/
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public void SignUp(string firstName, string lastName, string dob, string password)
        {
            UserModel user = new UserModel();
            user.Name = firstName + " " + lastName;
            user.Dob = dob;
            user.Password = password;
            RedirectToAction("Login");
        }

        public ActionResult Login(string emailID, string password)
        {
            switch(checkCredentials(emailID, password))
            {
                case CODE_0: return View();
                    break; // For safety
                case CODE_1: return Content("Username and/or password mismatch!");
                    break; // For safety
                case CODE_2: 
                    System.Console.Write("Entered CODE_2. Redirecting...\n");
                    RedirectToAction("Index", "Home");
                    break;
                default: return Content("Error Unknown/ Operation Not Supported");
            }
            return View();
        }

        private int checkCredentials(string emailID, string password)
        {
            UserModel tempUser = new UserModel();
            tempUser.EmailID= emailID;
            tempUser.Password = password;
            tempUser.Auth = true;
            if(emailID == null || password == null)
            {
                return CODE_0;
            }
            if (emailID.Equals("admin") && password.Equals("admin"))
            {
                @Session["user"] = tempUser;
                return CODE_2;
            }
            else
            {
                return CODE_1;
            }
        }
    }
}