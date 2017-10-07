using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Models
{
    public class UserModel
    {
        private string name = "";
        private string dob = "";
        private string emailID = "";
        private string password = "";
        private bool auth = false;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Dob
        {
            get { return dob; }
            set { dob = value; }
        }
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