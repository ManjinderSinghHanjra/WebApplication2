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
        public ActionResult Index()
        {
            return View();
        }

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

            if (length > RECORD_SIZE) length = RECORD_SIZE;
            if(start == 0)
            {
                filteredResult = search(searchParam, start, length);
            }
            var result = new { recordsTotal = RECORD_SIZE, recordsFiltered = filteredResult.Count, data = filteredResult.GetRange(start, (start+length > filteredResult.Count) ? (start+length-filteredResult.Count) : length) };
            previousSearchString = searchParam;
            return Json(result);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        private List<UserModel> search(string searchParams, int start, int length)
        {
            List<UserModel> tempList = new List<UserModel>();
            List<UserModel> users = (List<UserModel>)HttpContext.Application["users"];
            foreach(UserModel user in users)
            {
                Regex regex = new Regex(searchParams);
                if(regex.IsMatch(user.EmailID))
                {
                    tempList.Add(user);
                }
            }
            return tempList;
        }

    }
}



/*
 * Incomplete:
 * Implementation to apply operations <Search, SortByColumnName, & SortingDirection>
 * on the Stored Data (List).
 */

 /* public ActionResult Details(DataTableModel dataTable)
        {
            List<UserModel> filteredUsers = search(dataTable);
            return Json(new { data = filteredUsers } );
        }

        private List<UserModel> search(DataTableModel dataTable)
        {
            /*var searchString   = dataTable.search == null ? dataTable.search.value : "";
            var orderByCol   = dataTable.order  == null ? dataTable.order[0].column : 0;
            var orderDirection = dataTable.order  == null ? dataTable.order[0].dir.ToLower() : "asc";

            return (fetchDataInList(searchString, orderByCol, orderDirection));
        }

        private List<UserModel> fetchDataInList(string searchString, int orderByCol, string orderDirection)
        {
            List<UserModel> users = (List<UserModel>)System.Web.HttpContext.Current.Application["users"];
            List<UserModel> temp  = new List<UserModel>();
            Regex regex = new Regex(searchString);
            foreach(UserModel user in users)
            {
                if(regex.IsMatch(user.EmailID))
                {
                    temp.Add(user);
                }
            }

            switch(orderByCol)
            {
                case 0:
                    temp = temp.
                    break;
                case :1
                    temp = temp.OrderBy(o => o.Dob);
                    break;
                case 2:
                    temp = temp.OrderBy(o => o.EmailID);
                    break;
                case 3:
                    temp = temp.OrderBy(o => o.Password);
                    break;
                case 4:
                    temp = temp.OrderBy(o => o.Auth);
                    break;
            }
            
            return temp;

        }*/