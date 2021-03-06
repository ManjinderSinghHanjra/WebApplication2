﻿using System;
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
                
            System.Web.HttpContext.Current.Application["users"] = WebApplication2.Models.Utilities.GeneralUtilities.generateDummyUsers();
        }

        protected void Session_Start(Object sender, EventArgs e)
        {
            UserModel user = new UserModel();   // default will be guest. Read the UserModel code.
            HttpContext.Current.Session["user"] = user;
        }

    }
}