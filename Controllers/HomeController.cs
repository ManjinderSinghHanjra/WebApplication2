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


        /*-----------------------------------------------------------------------------------------------------------*/
        /// <summary>
        /// Tells if the Session User is a GUEST or a LoggedIn USER
        /// </summary>
        /// <returns>UserModel.GUEST or UserModel.USER</returns>
        public ActionResult Index()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");
            return View();
        }

        /*-----------------------------------------------------------------------------------------------------------*/
        public ActionResult Contact()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");
            ViewBag.Message = "Your contact page.";
            return View();
        }


        /* ------------------------------------------------------------------------------------------------------------ */
        public ActionResult About()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");
            return View();
        }

        
        /*-----------------------------------------------------------------------------------------------------------*/
        public ActionResult PopulateDataTable(int draw, int start, int length)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");

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


        /*-----------------------------------------------------------------------------------------------------------*/
        [HttpPost]
        public void Delete(int userId)
        {
            List<UserModel> listUsers = (List<UserModel>) HttpContext.Application["users"];
            foreach(UserModel user in listUsers)
            {
                if(user.Id == userId)
                {
                    listUsers.Remove(user);
                    break;
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
        public ActionResult ModifyRecord0(int userId)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");

            TempData["userId"] = userId;
            return Json(new { result = "Redirect", url = "Home/ModifyRecord1" });
        }

        public ActionResult ModifyRecord1()
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");

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
        public ActionResult ModifyRecord3(UserModel oUpdateUserModel)
        {
            if (GeneralUtilities.whoIs() == UserModel.GUEST) return RedirectToRoute("/");

            return Json("Record Update- Status: " + GeneralUtilities.stringifyStatus(static_oDataTableUtilites.updateUser(oUpdateUserModel)) + "!");
        }

    }
}