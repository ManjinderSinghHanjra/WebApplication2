using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Models
{
    public class UserModel 
    {

        /* Todo: Try separating stuff into interfaces & classes to get a heirarchy. */
        public const int NOTHING_MATCHED   = 0;
        public const int USER_MATCHED      = 1;
        public const int USER_PASS_MATCHED = 2;
        public const int GUEST = 100;
        public const int USER  = 101;


        private string name         = "";
        private string dob          = "";
        private string emailID      = "";
        private string password     = "";
        private int    type         = GUEST;
        private bool   auth         = false;
        
        public int Inside(List<UserModel> users)
        {
            foreach(UserModel user in users)
            {
                if (user.EmailID.Equals(this.EmailID))
                {
                    if(user.Password.Equals(this.Password))
                    {
                        this.Auth = true;
                        return USER_PASS_MATCHED;
                    }
                    return USER_MATCHED;
                }
            }
            return NOTHING_MATCHED;

        }


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

        public int Type
        {
            get { return type; }
            set { type = value; }
        }
    }
}