using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models.Utilities
{
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

        /// <summary>
        /// Generates dummy users for testing purposes.
        /// </summary>
        /// <returns>List of users(UserModel)</returns>
        public static List<UserModel> generateDummyUsers()
        {
            int year = 1000, month = 1, date = 1;
            List<UserModel> users = new List<UserModel>();
            users.Add(new UserModel()
            {
                Id = 0,
                Name = "Admin",
                Dob = DateTime.Now,
                EmailID = "admin",
                Password = "admin",
                Age = 22,
                Nationality = "Indian",
                Type = UserModel.USER,
                List_Education = new List<Education>(){ new WebApplication2.Models.Education() { University = "IKPTU", Specialization = "Bio-Informatics", Marks = 70 } },
                List_WorkExperience = new List<WorkExperience>() { new WebApplication2.Models.WorkExperience() { Organisation = "Patient Bond", Acheivements = "None", Skills = "SkillLevel-Novice", Experience = 100 , TotalExperience = 1000} },
                List_ResearchContribution = new List<ResearchContribution>() { new WebApplication2.Models.ResearchContribution() { Paper = "Gene Mutation in Gilbert Syndrome Patient", Mentions = "Patient Bond Biology Journal", Hyperlink = "none" },
                new WebApplication2.Models.ResearchContribution() { Paper = "Neutrino Bombardment Effect with Liquid Nitrogen", Mentions = "Patient Bond Physics Journal", Hyperlink = "none" }}
            });
            for (int i = 0; i < 50; i++)
            {
                users.Add(new UserModel() { Id = i+1, Name = (char)(i + 'a') + "Name", Dob = new DateTime(year, month, date), EmailID = (char)(i + (int)'a') + "@gmail.com", Password = i + "Password" });
            }
            return users;
        }
    }
}