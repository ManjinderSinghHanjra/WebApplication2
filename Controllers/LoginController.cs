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
        /* Login Request Status Constants */
        const int INITIAL_REQ = -1;         // It's a guest and he's not logged in and was redirected to this page. The guests are not allowed to access the site unless they sign in.
        const int NOTHING_MATCHED = 0;      // Username & Password, both haven't matched
        const int USER_MATCHED = 1;         // Username matched
        const int USER_PASS_MATCHED = 2;    // Username & Password matched!

        /* Returns SignUp page view */
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }


        /* Accepts SignUp form information from the client */
        [HttpPost]
        public ActionResult SignUpSubmitDetails(UserModel oUserModel)
        {
            /* Note:
             *      Don't change the order of the conditions put inside if() clause, we first need to check if elements are null or not null, 
             *      only then we can proceed with the other conditions.
             */
            /* Checks if the data received is empty or not */
            if (oUserModel == null || oUserModel.EmailID == null || oUserModel.Dob == null || oUserModel.Name == null || oUserModel.Password == null ||
                oUserModel.EmailID.Equals("") || oUserModel.Dob.Equals("") || oUserModel.Name.Equals("") || oUserModel.Password.Equals("")
                )
            {
                return Json("We don't accept forms that are empty or with any of the missing fields except LastName.");
            }
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            try
            {
                /* Whether user already exists or not */
                switch (oUserModel.Inside(users))
                {
                    case USER_MATCHED:
                    case USER_PASS_MATCHED:
                        return Json("Sorry, user already exists. If you are an existing user try logging in.");
                        break;                // For safety

                    default:                 // Create another user and add it to the Global Users List/Database. And return message SignUp Successful.
                        oUserModel.Id = users.Last().Id + 1;
                        users.Add(oUserModel);
                        HttpContext.Application["users"] = users;
                        return Json("Sign Up Successful!");
                }
            }
            catch (Exception e)
            {
                return Json("Error Unknown!" + e.ToString());
            }
        }


        /* Accepts Login information from the user */
        public ActionResult Login(string email, string password)
        {
            /* Handle the user depending upon his/her Login Request Status */
            switch (checkCredentials(email, password))
            {
                case INITIAL_REQ:       // The email & password were null, whatever could be the reasons just show the login page again. 
                    return View();
                    break;              // For safety

                case NOTHING_MATCHED:
                case USER_MATCHED:      // Return a message to the user that User/Pass mismatched!
                    return Json("Username and/or password mismatch!");
                    break;              // For safety

                case USER_PASS_MATCHED: // Login credentials matched. Get the user with the email and store it into Session user varible & proceed with ok message!
                    Session["user"] = WebApplication2.Models.Utilities.DataTableUtilities.search(email);
                    ((UserModel)Session["user"]).Type = UserModel.USER;
                    return Json("OK!");
                    break;

                default: return Json("Error Unknown/ Operation Not Supported");
            }
        }


        /* Checks if a user emailID & password matches with the database or not. Returns a Login Request Status Constant */
        private int checkCredentials(string emailID, string password)
        {
            UserModel oUserModel = new UserModel();
            oUserModel.EmailID = emailID;
            oUserModel.Password = password;
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            if (emailID == null || password == null)
            {
                return INITIAL_REQ;
            }
            return oUserModel.Inside(users);
        }
    }
}