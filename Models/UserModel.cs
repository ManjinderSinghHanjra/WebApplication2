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
        private int nAge = 0;
        private string strNationality = "";
        private int nType = GUEST;
        private bool bAuth = false;

        private List<Education> list_oEducation;
        private List<WorkExperience> list_oWorkExperience;
        private List<ResearchContribution> list_oResearchContribution;

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

        public int Age
        {
            get { return nAge; }
            set { nAge = value; }
        }
        public string Nationality
        {
            get { return strNationality; }
            set { strNationality = value; }
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

        public List<Education> List_Education
        {
            get
            {
                return list_oEducation;
            }
            set
            {
                list_oEducation = value;
            }
        }
        public List<WorkExperience> List_WorkExperience
        {
            get
            {
                return list_oWorkExperience;
            }
            set
            {
                list_oWorkExperience = value;
            }
        }
        public List<ResearchContribution> List_ResearchContribution
        {
            get
            {
                return list_oResearchContribution;
            }
            set
            {
                list_oResearchContribution = value;
            }
        }
    }



    public class Education
    {
        private string strUni = "";
        private string strSpecialization = "";
        private int nMarks = 0;

        public string University
        {
            get
            {
                return strUni;
            }
            set
            {
                strUni = value;
            }
        }
        public string Specialization
        {
            get
            {
                return strSpecialization;
            }
            set
            {
                strSpecialization = value;
            }
        }

        public int Marks
        {
            get
            {
                return nMarks;
            }
            set
            {
                nMarks = value;
            }
        }
    }

    public class WorkExperience
    {
        private string strOrganisation = "";
        private string strSkills = "";
        private string strAcheivements = "";
        private int nExperience = 0;
        private int nYears = 0;

        public string Organisation
        {
            get
            {
                return strOrganisation;
            }
            set
            {
                strOrganisation = value;
            }
        }
        public string Skills
        {
            get
            {
                return strSkills;
            }
            set
            {
                strSkills = value;
            }
        }

        public string Acheivements
        {
            get
            {
                return strAcheivements;
            }
            set
            {
                strAcheivements = value;
            }
        }

        public int Experience
        {
            get
            {
                return nYears;
            }
            set
            {
                nYears = value;
            }
        }

        public int TotalExperience
        {
            get { return nExperience; }
            set { nExperience = value; }
        }
    }

    public class ResearchContribution
    {
        private string strPaper = "";
        private string strMentions = "";
        private string strHyperlink = "";

        public string Paper
        {
            get
            {
                return strPaper;
            }
            set
            {
                strPaper = value;
            }
        }
        public string Mentions
        {
            get
            {
                return strMentions;
            }
            set
            {
                strMentions = value;
            }
        }

        public string Hyperlink
        {
            get
            {
                return strHyperlink;
            }
            set
            {
                strHyperlink = value;
            }
        }

    }
}