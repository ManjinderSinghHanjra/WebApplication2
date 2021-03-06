﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using WebApplication2.Models.Utilities;

namespace WebApplication2.Models.Utilities
{
    public class DataTableUtilities
    {
        
        /// <summary>
        /// Performs db search based on the parameters fed to it
        /// </summary>
        /// <param name="strSearchParams">Search string</param>
        /// <param name="nStart">Current page in DataTable/</param>
        /// <param name="nLength">Length of the search list that you want in return.</param>
        /// <returns>List of users that matched with the search parameters. It's length is specified in nLength parameter of this function</returns>
        public static List<UserModel> search(string strSearchParams, int nStart, int nLength)
        {
            List<UserModel> templistUsers = new List<UserModel>();
            List<UserModel> listUsers = (List<UserModel>)HttpContext.Current.Application["users"];
            foreach (UserModel user in listUsers)
            {
                Regex regex = new Regex(strSearchParams);
                if (user.EmailID == null)
                    user.EmailID = "N/A";
                if (regex.IsMatch(user.EmailID))
                {
                    templistUsers.Add(user);
                }
            }
            return templistUsers;
        }


        /// <summary>
        /// Performs search based on userId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>A user(UserModel) that matches based on the userId || null</returns>
        public static UserModel search(int userId)
        {
            List<UserModel> templistUsers = new List<UserModel>();
            List<UserModel> listUsers = (List<UserModel>)HttpContext.Current.Application["users"];
            foreach (UserModel user in listUsers)
            {
                if (user.Id == userId)
                    return user;
            }
            return null;
        }

        /// <summary>
        /// Performs search based on email
        /// </summary>
        /// <param name="email"></param>
        /// <returns>A user(UserModel) that matches based on the email || null</returns>
        public static UserModel search(string email)
        {
            List<UserModel> templistUsers = new List<UserModel>();
            List<UserModel> listUsers = (List<UserModel>)HttpContext.Current.Application["users"];
            foreach (UserModel user in listUsers)
            {
                if (user.EmailID == null)
                    user.EmailID = "N/A";
                if (user.EmailID.Equals(email))
                    return user;
            }
            return null;
        }


        /// <summary>
        /// Updates a user in db.
        /// </summary>
        /// <param name="oUserModel">An instance of UserModel class</param>
        /// <returns>Operation Status Constants: SUCCESS, FAILURE, UNKNOWN</returns>
        public int updateUser(UserModel oUserModel)
        {
            // Todo: Shouldn't be public. :/
            try
            {
                List<UserModel> listUsers = (List<UserModel>)HttpContext.Current.Application["users"];
                for (int i = 0; i < listUsers.Count; i++)
                {
                    if (listUsers[i].EmailID.Equals(oUserModel.EmailID))
                    {
                        listUsers[i] = oUserModel;
                    }
                }
                return GeneralUtilities.SUCCESS;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return GeneralUtilities.FAILURE;
            }
        }

        private void populateDataTable()
        {

        }
    }
}