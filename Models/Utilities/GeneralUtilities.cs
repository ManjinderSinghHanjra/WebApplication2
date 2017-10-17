using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models.Utilities
{
    // Todo: Should this be a class? :?
    public class GeneralUtilities
    {
        /* Operation Status Constants */
        public const int SUCCESS = 1;
        public const int FAILURE = 0;
        public const int UNKNOWN = -1;
        /// <summary>
        /// Tells if the current session user is a GUEST or a LoggedIn USER
        /// </summary>
        /// <returns>UserModel.GUEST and UserMode.USER</returns>
        public static int whoIs()
        {
            // Caution: This function shouldn't be public for security concerns. Look out for some other better approach.
            if (((UserModel)HttpContext.Current.Session["user"]).Type == UserModel.GUEST)
            {
                return UserModel.GUEST;
            }
            return UserModel.USER;
        }

        /// <summary>
        /// Stringify the Status Constants for readability or to directly send the status in readable form to the oUserModel.
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public static string stringifyStatus(int status)
        {
            switch (status)
            {
                case UNKNOWN: return "UNKNWON";
                case FAILURE: return "FAILURE";
                case SUCCESS: return "SUCCESS";
            }
            return "UNKNWON";
        }
    }
}