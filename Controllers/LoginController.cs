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
		public ActionResult LoginDetails(string emailID, string password)
		{
            if(emailID==null || password==null || validateText(emailID) || validateText(password))
            {
                return Content("Sorry, email and/or password were incorrect! Try again.");
            }
			if (emailID.Equals("admin") && password.Equals("admin"))
			{
				((UserModel)(@Session["user"])).Auth = true;
				return RedirectToAction("Index", "Home");
			}
			else
			{
				return Content("Sorry, email and/or password were incorrect! Try again.");
			}
		}

        [NonAction]
        private bool validateText(string text)
        {
            if (Regex.IsMatch(text, @"[^a-zA-Z0-9_.@]"))      // Don't look worried, it's just negated characters wali class
                return false;
            return true;
        }
	}
}