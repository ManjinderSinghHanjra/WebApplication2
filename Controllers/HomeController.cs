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

        static DataTableUtilities static_oDataTableUtilites = new DataTableUtilities();
        static string _previousSearchString = "drupakas";
        static List<UserModel> _filteredResults = null;
        static int RECORD_SIZE = 50;


        /*------------------------------------------Index----------------------------------------------------------------*/
        public ActionResult Index()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            return View();
        }

        /*-----------------------------------------Contact-----------------------------------------------------------*/
        public ActionResult Contact()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            ViewBag.Message = "Your contact page.";
            return View();
        }


        /* ----------------------------------------About--------------------------------------------------------------- */
        public ActionResult About()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            return View();
        }

        /*----------------------------------------FormFill--------------------------------------------*/
        public ActionResult CreateAnonymousAccounts()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            return View();
        }

        /*----------------------------------------UpdateAccount--------------------------------------------*/
        public ActionResult UpdateAccount()
        {
            return View();
        }

        /*----------------------------------------Dashboard--------------------------------------------*/
        public ActionResult UserDashboard()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            return View();
        }

        /*----------------------------------------Log Out--------------------------------------------*/
        public ActionResult LogOut()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            UserModel user = (UserModel)HttpContext.Session["user"];
            user.Type = UserModel.GUEST;
            user.Auth = false;
            HttpContext.Session["user"] = user;
            return RedirectToAction("Login", "Login");
        }



        /*----------------------------------------FinalizeUpdate--------------------------------------------*/
        [HttpPost]
        public ActionResult FinalizeUpdateAccount(List<UserModel> user)
        {
            List<UserModel> listUsers = (List<UserModel>)HttpContext.Application["users"];
            listUsers.AddRange(user);
            HttpContext.Application["users"] = listUsers;
            return Json("Account Successfully updated! \n Total users: " + listUsers.Count);
        }

        

        /*------------------------------------PopulateDataTable--------------------------------------------*/
        public ActionResult PopulateDataTable(int draw, int start, int length)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");

            string strSearchParam = Request.Params["search[value]"];
            if (start == 0 || !strSearchParam.Equals(_previousSearchString))
            {
                _filteredResults = DataTableUtilities.search(strSearchParam, start, length);
            }

            start = start >= _filteredResults.Count ? _filteredResults.Count : start;
            int nRange = (start + length) >= _filteredResults.Count ? (_filteredResults.Count - start) : length;
            var jsonResult = new { recordsTotal = RECORD_SIZE, recordsFiltered = _filteredResults.Count, data = _filteredResults.GetRange(start, nRange) };
            _previousSearchString = strSearchParam;
            return Json(jsonResult);

        }


        /*----------------------------------------Delete User---------------------------------------------------------*/
        [HttpPost]
        public void Delete(List<int> listUserIds)
        {
            List<UserModel> listUsers = (List<UserModel>) HttpContext.Application["users"];
            foreach (int Id in listUserIds)
            {
                foreach (UserModel user in listUsers)
                {
                    if (user.Id == Id)
                    {
                        listUsers.Remove(user);
                        break;
                    }
                }
            }
            RECORD_SIZE = listUsers.Count;
            HttpContext.Application["users"] = listUsers;
            _filteredResults = (List<UserModel>)HttpContext.Application["users"];
        }




        /* ------------------------------------------------------------------------------------------------------------ */
        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateUser"></param>
        /// <returns></returns>
        public ActionResult RequestToUpdateUser(int userId)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");
            TempData["userId"] = userId;
            return Json(new { result = "Redirect", url = "Home/UpdateUserForm" });
        }

        public ActionResult UpdateUserForm()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");

            UserModel oDummy = new UserModel();
            oDummy.EmailID = "dummy";
            oDummy.Name = "dummy";
            oDummy.Password = "dummyPassword";
            oDummy.Dob = DateTime.Now;
            oDummy.Auth = false;
            TempData["updateUser"] = TempData["userId"] == null ? oDummy : DataTableUtilities.search((int)TempData["userId"]);
            return View(TempData["updateuser"]);
        }
        
        [HttpPost]
        public ActionResult UpdateUserCommit(UserModel oUpdateUserModel)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToAction("Login", "Login");

            return Json("Record Update- Status: " + GeneralUtilities.stringifyStatus(static_oDataTableUtilites.updateUser(oUpdateUserModel)) + "!");
        }

    }
}