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
        const int CODE_0 = 0;       // show login page, the user has been redirected from some other page that he/she might have stumbled upon accidentaly
        const int CODE_1 = 1;       // username-password mismatch : Return the same View()
        const int CODE_2 = 2;       // username-password matched  : Login Successful
        // GET: /Login/
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignUp(string firstName, string lastName, string dob, string email, string password)
        {
            UserModel user = new UserModel();
            user.Name = firstName + " " + lastName;
            user.Dob = dob;
            user.EmailID = email;
            user.Password = password;
            Session["user"] = user;

            //System.Console.Write(firstName + "" + lastName + "" + dob + "" + password);

            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            System.Console.Write(" " + users.Contains(user).ToString());
            try
            {
                if (users.Contains(user))
                {
                    return Content("Sorry, user already exists. If you are an existing user try logging in.");
                }
                else
                {
                    users.Add(user);
                    HttpContext.Application["users"] = users;
                    System.Console.Write("User created successfully");
                    return RedirectToAction("Login");
                }
            }
            catch (Exception e)
            {
                return Content("Some error has occured. Please try again later.");
            }
        }

        public ActionResult Login(string emailID, string password)
        {
            switch (checkCredentials(emailID, password))
            {
                case CODE_0: return View();
                    break; // For safety
                case CODE_1: return Content("Username and/or password mismatch!");
                    break; // For safety
                case CODE_2:
                    System.Console.Write("Entered CODE_2. Redirecting...\n");
                    RedirectToRoute("Home");
                    break;
                default: return Content("Error Unknown/ Operation Not Supported");
            }
            return View();
        }

        private int checkCredentials(string emailID, string password)
        {
            UserModel user = new UserModel();
            user.EmailID = emailID;
            user.Password = password;
            string pass = "";
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            if (emailID == null || password == null)
            {
                return CODE_0;
            }
            if (users.Contains(user))
            {
                foreach (UserModel temp in users)
                {
                    if (temp.Equals(user) && temp.Password == user.Password)
                    {
                        user.Auth = true;
                        HttpContext.Session["user"] = user;
                        return CODE_2;
                    }
                }
                return CODE_1;
            }
            else
            {
                return CODE_1;
            }
        }
    }
}