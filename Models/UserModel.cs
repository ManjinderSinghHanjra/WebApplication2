using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Models
{
    public class UserModel
    {
        private string emailID = "admin";
        private string password = "admin";
        private bool auth = false;

        public string EmailID
        {
            get { return emailID; }
            set { emailID = value; }
        }
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        public bool Auth
        {
            get { return auth; }
            set { auth = value; }
        }
    }
}