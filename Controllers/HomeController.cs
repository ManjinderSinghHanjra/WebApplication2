using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;
using WebApplication2.Models.Utilities;


namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {

        static string previousSearchString = "";
        static List<UserModel> filteredResult = null;
        const int RECORD_SIZE = 50;
        const int SUCCESS     = 1;
        const int FAILURE     = 0;
        const int UNKNOWN     = -1;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        /* ------------------------------------------------------------------------------------------------------------ */
        public ActionResult About()
        {
            return View();
        }


        public ActionResult Details(int draw, int start, int length)  // Todo:
        {
            string searchParam = Request.Params["search[value]"];

            /* If you don't know what you're doing then, even minute changes or reordering can give you a hurt burn ;) */
            // if(searchParam == null || searchParam == "" || !searchParam.Equals(previousSearchString))
            // huh! No more hurt burns. :D
            // You spelled heart wrong. :}

            if (length > RECORD_SIZE) length = RECORD_SIZE;
            if (start == 0)
            {
                filteredResult = search(searchParam, start, length);
            }
            var result = new { recordsTotal = RECORD_SIZE, recordsFiltered = filteredResult.Count, data = filteredResult.GetRange(start, (start + length > filteredResult.Count) ? (start + length - filteredResult.Count) : length) };
            previousSearchString = searchParam;
            return Json(result);
        }

        [HttpPost]
        public void Delete(UserModel deleteUser)
        {
            List<UserModel> users = (List<UserModel>) HttpContext.Application["users"];
            foreach(UserModel user in users)
            {
                if(user.EmailID.Equals(deleteUser.EmailID))
                {
                    users.Remove(user);
                    break;
                }
            }
            HttpContext.Application["users"] = users;
        }

        private List<UserModel> search(string searchParams, int start, int length)
        {
            List<UserModel> tempList = new List<UserModel>();
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            foreach (UserModel user in users)
            {
                Regex regex = new Regex(searchParams);
                if (regex.IsMatch(user.EmailID))
                {
                    tempList.Add(user);
                }
            }
            return tempList;
        }




        /* ------------------------------------------------------------------------------------------------------------ */
        public ActionResult ModifyRecord0(UserModel updateUser)
        {
            TempData["updateUser"] = updateUser;
            return Json(new { result = "Redirect", url = "Home/ModifyRecord1" });
        }
        public ActionResult ModifyRecord1()
        {
            UserModel dummy = new UserModel();
            dummy.EmailID = "dummy";
            dummy.Name = "dummy";
            dummy.Password = "dummyPassword";
            dummy.Dob = "1 Jan 1995";
            dummy.Auth = false;
            TempData["updateUser"] = TempData["updateUser"] == null ? dummy : (UserModel)TempData["updateUser"];
            return View(TempData["updateuser"]);
        }
        
        [HttpPost]
        public ActionResult ModifyRecord3(UserModel updateUser)
        {
            return Json("Record Update- Status: " + Status(modify(updateUser)) + "!");
        }

        private int modify(UserModel updateUser)
        {
            try
            {
                List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
                for (int i = 0; i < users.Count; i++ )
                {
                    if (users[i].EmailID.Equals(updateUser.EmailID))
                    {
                        users[i] = updateUser;
                    }
                }
                return SUCCESS;
            } catch(Exception e)
            {
                Console.Write(e);
                return FAILURE;
            }
                //return UNKNOWN;
        }

        private string Status(int status)
        {
            switch(status)
            {
                case UNKNOWN: return "UNKNWON";
                case FAILURE: return "FAILURE";
                case SUCCESS: return "SUCCESS";
            }
            return "UNKNWON";
        }

    }
}