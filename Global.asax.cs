using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WebApplication2.Models;

namespace WebApplication2
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            List<UserModel> users = new List<UserModel>();
            users.Add(new UserModel() { Name = "guest", Dob = "1-1-1", EmailID = "guest", Password = "guest" });
            users.Add(new UserModel() { Name = "admin0", Dob = "1-1-1", EmailID = "admin0", Password = "admin0" });
            users.Add(new UserModel() { Name = "admin1", Dob = "1-1-1", EmailID = "admin1", Password = "admin1" });
            users.Add(new UserModel() { Name = "admin2", Dob = "1-1-1", EmailID = "admin2", Password = "admin2" });
            users.Add(new UserModel() { Name = "admin3", Dob = "1-1-1", EmailID = "admin3", Password = "admin3" });
            System.Web.HttpContext.Current.Application["users"] = users;
        }

        protected void Session_Start(Object sender, EventArgs e)
        {
            UserModel user = null;
            /*UserModel user = new UserModel();
            user.Auth = false;
            user.EmailID = "";
            user.Password = "";*/
            HttpContext.Current.Session.Add("User", user);
        }
    }
}


//Application["users"] = users;
/*
 * Better alernative to List approach as the Time Complexity is constant in dictionary lookup:
 * To do: Later
 * Dictionary<UserModel, String> users = new Dictionary<UserModel, string>();
 * users.Add(new UserModel() { Name = "guest", Dob = "1-1-1", EmailID = "guest" }, "guest");
 * users.Add(new UserModel() { Name = "admin", Dob = "1-1-1", EmailID = "admin" }, "admin");
 */