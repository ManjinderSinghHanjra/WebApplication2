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
            for (int i = 0; i < 50; i++)
            {
                users.Add(new UserModel() { Name = (char)(i + 'a') + "Name", Dob = "1-1-" + (i+1900), EmailID = (char)(i+(int)'a') + "@gmail.com", Password = i + "Password" });
            }
                
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

        public string Password { get; set; }
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


/*
users.Add(new UserModel() { Name = "guest", Dob = "1-1-1", EmailID = "guest", Password = "guest" });
            users.Add(new UserModel() { Name = "admin0", Dob = "1-2-1", EmailID = "admin0", Password = "admin0" });
            users.Add(new UserModel() { Name = "admin1", Dob = "1-3-1", EmailID = "admin1", Password = "admin1" });
            users.Add(new UserModel() { Name = "admin2", Dob = "1-4-1", EmailID = "admin2", Password = "admin2" });
            users.Add(new UserModel() { Name = "admin3", Dob = "1-5-1", EmailID = "admin3", Password = "admin3" });
            users.Add(new UserModel() { Name = "guest1", Dob = "1-1-19", EmailID = "guest", Password = "guest" });
            users.Add(new UserModel() { Name = "admin0", Dob = "1-2-71", EmailID = "admin0", Password = "admin0" });
            users.Add(new UserModel() { Name = "admin12", Dob = "1-3-091", EmailID = "admin1", Password = "admin1" });
            users.Add(new UserModel() { Name = "admin23", Dob = "1-4-771", EmailID = "admin2", Password = "admin2" });
            users.Add(new UserModel() { Name = "admin34", Dob = "21-5-1", EmailID = "admin3", Password = "admin3" });
            users.Add(new UserModel() { Name = "guest25", Dob = "1-1-331", EmailID = "guest", Password = "guest" });
            users.Add(new UserModel() { Name = "admin0", Dob = "1-2-441", EmailID = "admin0", Password = "admin0" });
            users.Add(new UserModel() { Name = "admin17", Dob = "1-3-441", EmailID = "admin1", Password = "admin1" });
            users.Add(new UserModel() { Name = "admin28", Dob = "1-4-122", EmailID = "admin2", Password = "admin2" });
            users.Add(new UserModel() { Name = "admin39", Dob = "1-5-11", EmailID = "admin3", Password = "admin3" });
            users.Add(new UserModel() { Name = "guest30", Dob = "1-1-771", EmailID = "guest", Password = "guest" });
            users.Add(new UserModel() { Name = "admin0", Dob = "1-2-41", EmailID = "admin0", Password = "admin0" });
            users.Add(new UserModel() { Name = "admin21", Dob = "1-3-61", EmailID = "admin1", Password = "admin1" });
            users.Add(new UserModel() { Name = "admin32", Dob = "1-4-166", EmailID = "admin2", Password = "admin2" });
            users.Add(new UserModel() { Name = "admin53", Dob = "1-5-414", EmailID = "admin3", Password = "admin3" }); */