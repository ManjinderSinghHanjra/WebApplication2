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

        /* There is a reason why I have created these constants, one may go for *bool* while writing functions, but give a thorough read to the code and try to understand
         * the logic. My only motive was to reduce the LOC clutter and these constants have helped me to use switch instead of if-else statements with *boolean* evaluations.
         */
        const int INITIAL_REQ = -1;         // It's a guest and he's not logged in and was redirected to this page. The guests are not allowed to access the site unless they sign in.
        const int NOTHING_MATCHED = 0;      // Username & Password, both haven't matched
        const int USER_MATCHED = 1;         // Username matched
        const int USER_PASS_MATCHED = 2;    // Username & Password matched!

        // GET: /Login/
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }


        [HttpPost]
        public ActionResult SignUpSubmitDetails(UserModel user)
        {
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            try
            {
                switch (user.Inside(users))
                {
                    case USER_MATCHED:
                    case USER_PASS_MATCHED:
                        return Json("Sorry, user already exists. If you are an existing user try logging in.");
                        break; // For safety
                    default:
                        users.Add(user);
                        HttpContext.Application["users"] = users;
                        return Json("Sign Up Successful!");
                }
            }
            catch (Exception e)
            {
                return Json("Error Unknown!" + e.ToString());
            }
        }

        public ActionResult Login(string email, string password)
        {
            switch (checkCredentials(email, password))
            {
                case INITIAL_REQ: return View();
                    break; // For safety
                case NOTHING_MATCHED:
                case USER_MATCHED:
                    return Json("Username and/or password mismatch!");
                    break; // For safety
                case USER_PASS_MATCHED:
                    System.Console.Write("Entered CODE_2. Redirecting...\n");
                    return Json("Sign In Successful! Redirecting You to the website...");
                    break;
                default: return Json("Error Unknown/ Operation Not Supported");
            }
        }

        private int checkCredentials(string emailID, string password)
        {
            UserModel user = new UserModel();
            user.EmailID = emailID;
            user.Password = password;
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            if (emailID == null || password == null)
            {
                return INITIAL_REQ;
            }
            return user.Inside(users);
        }
    }
}