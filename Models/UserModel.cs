using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Models
{
    public class UserModel
    {

        public const int NOTHING_MATCHED = 0;
        public const int USER_MATCHED = 1;
        public const int USER_PASS_MATCHED = 2;
        public const int GUEST = 100;
        public const int USER = 101;
        public const int RESERVED_GUEST_ID = -1;

        private int nId = RESERVED_GUEST_ID;
        private string strName = "guest";
        private DateTime dtDob = System.DateTime.Now;
        private string strEmailID = "";
        private string strPassword = "";
        private int nType = GUEST;
        private bool bAuth = false;

        public int Inside(List<UserModel> users)
        {
            foreach (UserModel user in users)
            {
                if (user.EmailID.Equals(this.EmailID))
                {
                    if (user.Password.Equals(this.Password))
                    {
                        this.Auth = true;
                        return USER_PASS_MATCHED;
                    }
                    return USER_MATCHED;
                }
            }
            return NOTHING_MATCHED;

        }

        public int Id
        {
            get { return nId; }
            set { nId = value; }
        }
        public string Name
        {
            get { return strName; }
            set { strName = value; }
        }

        public DateTime Dob
        {
            get { return dtDob; }
            set { dtDob = value; }
        }
        public string EmailID
        {
            get { return strEmailID; }
            set { strEmailID = value; }
        }
        public string Password
        {
            get { return strPassword; }
            set { strPassword = value; }
        }

        public bool Auth
        {
            get { return bAuth; }
            set { bAuth = value; }
        }

        public int Type
        {
            get { return nType; }
            set { nType = value; }
        }
    }
}