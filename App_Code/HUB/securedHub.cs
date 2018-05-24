using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections;
using System.Web.Script.Serialization;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR;
using Pollr.Models;
using System.Data.Entity.Validation;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

/// <summary>
/// Summary description for HUB
/// </summary>
namespace Pollr {
    [HubName("securedhub")]
    public class securedhub : Microsoft.AspNet.SignalR.Hub
    {

        public override System.Threading.Tasks.Task OnConnected()
        {
            string clientId = Context.ConnectionId;
            //string data = clientId;
            //string count = "";
            //try
            //{
            //    count = GetCount().ToString();
            //}
            //catch (Exception d)
            //{
            //    count = d.Message;
            //}
            DataSet ds = new DataSet();
            ds = DAL.sp_User_Test(clientId);

            //Clients.Caller.receiveMessage("ChatHub", data, count);
            return base.OnConnected();
        }

        _DAL DAL = new _DAL();

        _ManageObject ManageObject = new _ManageObject();

        JavaScriptSerializer js = new JavaScriptSerializer();

        HttpSessionStateBase Session;

 
        [HubMethodName("VerifyLogin")]
        public void VerifyLogin(string email_ln, string password_ln)
        {
            try
            {
                // Session["email"] = email_ln;
                string outputNumberValue = "";
               // string Role = "";
                DataSet ds = new DataSet();
                ds = DAL.sp_User_Login(email_ln, password_ln);

                DataRow drow0 = ds.Tables[0].Rows[0];
                string outputNumber = drow0.ItemArray.GetValue(0).ToString();
                BLL.WriteLog(outputNumber);
                if (outputNumber == "547")
                {
                    outputNumberValue = drow0.ItemArray.GetValue(1).ToString();
                    String outputMessage = BLL.OutPut_Message(outputNumber, outputNumberValue);
                    Clients.Caller.loginError(outputMessage);
                }
                else
                {
                    DataTable dt = ds.Tables[1];
                    //DataRow drow1 = ds.Tables[1].Rows[0];
                    //Role = drow1.ItemArray.GetValue(0).ToString();
                    Clients.Caller.getFeedBack(dt);
                }

            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
            }
        }

        [HubMethodName("dashBoardMain_")]
        public Object dashBoardMain_(DateTime date_from, DateTime date_to)
        {
            try
            {
                DataSet ds = new DataSet();
                ds = DAL.sp_Dashboard_(date_from, date_to);

                // var dami = BLL.DataTableToJSON(dt_total_Actual);
                // BLL.WriteLog(dami);
               // Clients.Caller.getdashboardmain_(dt_total_Actual, dt_total_Power, dt_total_Energy, dt_total_Sold);
                List<object> _dt = new List<object>();
                _dt.Add(ds.Tables[0]);
                _dt.Add(ds.Tables[1]);
                //_dt.Add(ds.Tables[2]);
                //_dt.Add(ds.Tables[3]);
                //_dt.Add(ds.Tables[4]);
                //_dt.Add(ds.Tables[5]);
                //_dt.Add(ds.Tables[6]);
                //_dt.Add(ds.Tables[7]);
                //_dt.Add(ds.Tables[8]);
                //_dt.Add(ds.Tables[9]);
                //_dt.Add(ds.Tables[10]);
                //_dt.Add(ds.Tables[11]);
                //_dt.Add(ds.Tables[12]);
                //_dt.Add(ds.Tables[13]);
                //_dt.Add(ds.Tables[14]);
                //_dt.Add(ds.Tables[15]);
                //_dt.Add(ds.Tables[16]);
                //_dt.Add(ds.Tables[17]);
                //_dt.Add(ds.Tables[18]);
                //_dt.Add(ds.Tables[19]);
                //_dt.Add(ds.Tables[20]);
                //_dt.Add(ds.Tables[21]);
                //_dt.Add(ds.Tables[22]);
                return _dt;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;

            }
        }

        [HubMethodName("changePassword")]
        public object changePassword(string email_ln, string password_ln, string oldpassword_ln)
        {

            try
            {
                DataSet ds = new DataSet();
                string Display_Message;
                string Output_Number;
                ds = DAL.sp_Change_Password(email_ln, password_ln, oldpassword_ln);
                Display_Message = ds.Tables[0].Rows[0].ItemArray.GetValue(0).ToString();
                Output_Number = ds.Tables[1].Rows[0].ItemArray.GetValue(0).ToString();
                Clients.Caller.postClient(Display_Message);
                // dt_return = Display_Message;
                return Output_Number;
            }
            catch (Exception ex)
            {
                Clients.Caller.postClient(ex.Message + " : " + ex.StackTrace);
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;
            }
        }


        [HubMethodName("dashBoardMain")]
        public Object dashBoardMain()
        {
            try
            {
                DataSet ds = new DataSet();
                ds = DAL.sp_DashBoard_Main();

                DataTable dt_total_Actual = new DataTable();
                DataTable dt_total_Power = new DataTable();
                DataTable dt_total_Energy = new DataTable();
                DataTable dt_total_Sold = new DataTable();

                dt_total_Actual = ds.Tables[0];
                dt_total_Power = ds.Tables[1];
                dt_total_Energy = ds.Tables[2];
                dt_total_Sold = ds.Tables[3];
               // var dami = BLL.DataTableToJSON(dt_total_Actual);
               // BLL.WriteLog(dami);
                Clients.Caller.getdashboardmain(dt_total_Actual, dt_total_Power, dt_total_Energy, dt_total_Sold);
                List<object> _dt = new List<object>();
                _dt.Add(dt_total_Actual);
                _dt.Add(dt_total_Power);
                _dt.Add(dt_total_Energy);
                _dt.Add(dt_total_Sold);
                _dt.Add(ds.Tables[4]);
                _dt.Add(ds.Tables[5]);
                _dt.Add(ds.Tables[6]);
                _dt.Add(ds.Tables[7]);
                _dt.Add(ds.Tables[8]);
                _dt.Add(ds.Tables[9]);
                _dt.Add(ds.Tables[10]);
                _dt.Add(ds.Tables[11]);
                _dt.Add(ds.Tables[12]);
                _dt.Add(ds.Tables[13]);
                _dt.Add(ds.Tables[14]);
                _dt.Add(ds.Tables[15]);
                _dt.Add(ds.Tables[16]);
                _dt.Add(ds.Tables[17]);
                _dt.Add(ds.Tables[18]);
                _dt.Add(ds.Tables[19]);
                _dt.Add(ds.Tables[20]);
                _dt.Add(ds.Tables[21]);
                _dt.Add(ds.Tables[22]);
                return _dt;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;

            }
        }


        public object dashBoardMain_graph(string date, string columnName)
        {
            string Display_Message;
            string Output_Number;
            try
            {
                DataSet ds = new DataSet();
                ds = DAL.sp_DashBoard_Graph(date, columnName);
                DataTable dt = ds.Tables[0];
               // DataRow drow1 = ds.Tables[1].Rows[0];
               // Display_Message = drow.ItemArray.GetValue(0).ToString();
               // Output_Number = drow1.ItemArray.GetValue(0).ToString();

                Clients.Caller.graph_dashboardMain(dt);
                //dt_return = Display_Message;
                return dt;
            }
            catch (Exception ex)
            {
                Clients.Caller.graph_dashboardMain(ex.Message + " : " + ex.StackTrace);
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;
            }
        }

        [HubMethodName("postData")]
        public object postData(string mod_, object _Param)
        {
            DataSet ds = new DataSet();
            string Display_Message;
            string Output_Number;
            try
            {
                switch (mod_)
                {
                    case "User_Log":
                        BLL.WriteLog("Disco_Log");
                        BLL.WriteLog(_Param.ToString());
                        _Obj_Users param_U = js.Deserialize<_Obj_Users>(_Param.ToString());
                        ds = DAL.sp_User_Insert(param_U.User_FullName, param_U.User_Email, param_U.User_PhoneNumber, "Password12@",
                                                 param_U.CreatedBy, param_U.Role_ID, param_U.Role_Name, param_U.Company_ID);
                        break;

                    case "Disco_Log" :
                        BLL.WriteLog("Disco_Log");
                        BLL.WriteLog(_Param.ToString());                       
                        _Obj_Disco param = js.Deserialize<_Obj_Disco>(_Param.ToString());
                        ds = DAL.sp_Disco_Insert(param.Name,param.Code_Name,param.Email,param.Phone_Number,
                                                 param.Address,param.Website,param.State_Covered,param.State_ID,
                                                 param.longitude.ToString(),param.latitude.ToString(),param.Date_Incorporated);
                        break;
                    case "Genco_log":
                        BLL.WriteLog("Genco_Log");
                        break;
                    case "Received_Broadcast" :
                        BLL.WriteLog("Received_Broadcast");
                        BLL.WriteLog(_Param.ToString());
                        _Obj_Broadcast_R param_R = js.Deserialize<_Obj_Broadcast_R>(_Param.ToString());
                        ds = DAL.sp_Broadcast_Received_Insert(param_R.Genco_ID, param_R.Power_Recevied, param_R.Recording_Date);
                        break;
                    case "Sent_Broadcast":
                        _Obj_Broadcast_S param_S = js.Deserialize<_Obj_Broadcast_S>(_Param.ToString());
                        ds = DAL.sp_Broadcast_Sent_Insert(param_S.Disco_ID, param_S.Power_Sent, param_S.Recording_Date);
                        break;
                    case "Consumer_Record":
                        _Obj_Disco_Consumer_Record param_C = js.Deserialize<_Obj_Disco_Consumer_Record>(_Param.ToString());
                        ds = DAL.sp_Disco_Consumer_Insert(param_C.Disco_ID, param_C.Consumer_Ubran, param_C.Consumer_Rural, param_C.Consumer_Residential,param_C.Consumer_Industrial, param_C.E_Distribution_Residential, param_C.E_Distribution_Industrial, param_C.Created_By, param_C.Reporting_Date);
                        break;

                    case "Disco_Revenue_Operations":
                        _Obj_Revenue_D param_DR = js.Deserialize<_Obj_Revenue_D>(_Param.ToString());
                        ds = DAL.sp_Disco_Revenue_Operation(param_DR.Disco_ID,param_DR.Revenue_Energy,param_DR.Revenue_Others,param_DR.Total_Revenue,param_DR.OE_Fuel,
                                                            param_DR.OE_Purchased_Power,param_DR.OE_Generation,param_DR.OE_Transmission,param_DR.OE_Distribution,param_DR.OE_Consumer_Services,
                                                            param_DR.OE_Bad_Debts,param_DR.OE_Administration,param_DR.OE_Amortisation,param_DR.OE_Depreciation,param_DR.OE_Total,
                                                            param_DR.Electicity_Sale,param_DR.Average_Price_Kobo,param_DR.Operation_Income,param_DR.Interest_Deposit,param_DR.Interest_Paid,
                                                            param_DR.Net_Income,param_DR.Record_Date, param_DR.CreatedBy);
                        break;


                    case "genco_daily_record":
                        
                         _Obj_Power_Generation param_PG = js.Deserialize<_Obj_Power_Generation>(_Param.ToString());
                        ds = DAL.sp_genco_daily_record_Insert(param_PG.Power_ID, param_PG.Power_Generated, param_PG.Power_Sent_Out, param_PG.Spinning_Reserved, param_PG.Total_PeakHR,
                                                              param_PG.TotalOff_PeakHR, param_PG.Cost_Operation, param_PG.TurnOver, param_PG.Record_Date, param_PG.CreatedBy);
                        break;
                    case "disco_sale_account_record":
                        _Obj_Sale_Account param_SA = js.Deserialize<_Obj_Sale_Account>(_Param.ToString());
                        ds = DAL.sp_Disco_Sales_Account_Insert(param_SA.DISCO_ID, param_SA.Sales_Residential, param_SA.Sales_Commercial, param_SA.Sales_Industrial, param_SA.Total_Sale,
                                                              param_SA.Account_Receivable_Government, param_SA.Account_Receivable_Private, param_SA.Account_Receivable_Customer, param_SA.Record_Date, param_SA.CreatedBy);
                        break;
                }
               Display_Message = ds.Tables[0].Rows[0].ItemArray.GetValue(0).ToString();
               Output_Number = ds.Tables[1].Rows[0].ItemArray.GetValue(0).ToString();
               Clients.Caller.postClient(Display_Message);
               // dt_return = Display_Message;
                return Output_Number;
            }
            catch(Exception ex)
            {
                Clients.Caller.postClient(ex.Message + " : " + ex.StackTrace);
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;
            }
        }

        [HubMethodName("updateData")]
        public object updateData(string mod_, object _Param)
        {
            DataSet ds = new DataSet();
            string Display_Message;
            string Output_Number;
            try
            {
                switch (mod_)
                {

                    case "Disco_Log":
                        BLL.WriteLog("Disco_Log");
                        BLL.WriteLog(_Param.ToString());
                        _Obj_Disco param = js.Deserialize<_Obj_Disco>(_Param.ToString());
                        ds = DAL.sp_Disco_Insert(param.Name, param.Code_Name, param.Email, param.Phone_Number,
                                                 param.Address, param.Website, param.State_Covered, param.State_ID,
                                                 param.longitude.ToString(), param.latitude.ToString(), param.Date_Incorporated);
                        break;
                    case "Genco_log":
                        BLL.WriteLog("Genco_Log");
                        break;
                    case "Received_Broadcast_Update":
                        BLL.WriteLog("Received_Broadcast_Update");
                        BLL.WriteLog(_Param.ToString());
                        _Obj_Broadcast_R param_R = js.Deserialize<_Obj_Broadcast_R>(_Param.ToString());
                        ds = DAL.sp_Broadcast_Received_Update(param_R.ID,param_R.Genco_ID, param_R.Power_Recevied, param_R.Recording_Date);
                        break;
                    case "Sent_Broadcast_Update":
                        _Obj_Broadcast_S param_S = js.Deserialize<_Obj_Broadcast_S>(_Param.ToString());
                        ds = DAL.sp_Broadcast_Sent_Update(param_S.ID,param_S.Disco_ID, param_S.Power_Sent, param_S.Recording_Date);
                        break;
                    case "Consumer_Record_Update":
                        _Obj_Disco_Consumer_Record param_C = js.Deserialize<_Obj_Disco_Consumer_Record>(_Param.ToString());
                        ds = DAL.sp_Disco_Consumer_Update(param_C.ID,param_C.Disco_ID, param_C.Consumer_Ubran, param_C.Consumer_Rural, param_C.Consumer_Residential, param_C.Consumer_Industrial, param_C.E_Distribution_Residential, param_C.E_Distribution_Industrial, param_C.Reporting_Date);
                        break;

                    case "Disco_Revenue_Operations_Update":
                        _Obj_Revenue_D param_DR = js.Deserialize<_Obj_Revenue_D>(_Param.ToString());
                        ds = DAL.sp_Disco_Revenue_Operation_Update(param_DR.ID,param_DR.Disco_ID, param_DR.Revenue_Energy, param_DR.Revenue_Others, param_DR.Total_Revenue, param_DR.OE_Fuel,
                                                            param_DR.OE_Purchased_Power, param_DR.OE_Generation, param_DR.OE_Transmission, param_DR.OE_Distribution, param_DR.OE_Consumer_Services,
                                                            param_DR.OE_Bad_Debts, param_DR.OE_Administration, param_DR.OE_Amortisation, param_DR.OE_Depreciation, param_DR.OE_Total,
                                                            param_DR.Electicity_Sale, param_DR.Average_Price_Kobo, param_DR.Operation_Income, param_DR.Interest_Deposit, param_DR.Interest_Paid,
                                                            param_DR.Net_Income, param_DR.Record_Date);
                        break;


                    case "genco_daily_record_Update":
                        _Obj_Power_Generation param_PG = js.Deserialize<_Obj_Power_Generation>(_Param.ToString());
                        ds = DAL.sp_genco_daily_record_Update(param_PG.ID,param_PG.Power_ID, param_PG.Power_Generated, param_PG.Power_Sent_Out, param_PG.Spinning_Reserved, param_PG.Total_PeakHR,
                                                              param_PG.TotalOff_PeakHR, param_PG.Cost_Operation, param_PG.TurnOver, param_PG.Record_Date);
                        break;
                    case "disco_sale_account_record_Update":
                        _Obj_Sale_Account param_SA = js.Deserialize<_Obj_Sale_Account>(_Param.ToString());
                        ds = DAL.sp_Disco_Sales_Account_Update(param_SA.ID, param_SA.DISCO_ID, param_SA.Sales_Residential, param_SA.Sales_Commercial, param_SA.Sales_Industrial, param_SA.Total_Sale,
                                                              param_SA.Account_Receivable_Government, param_SA.Account_Receivable_Private, param_SA.Account_Receivable_Customer, param_SA.Record_Date);
                        break;
                }
                Display_Message = ds.Tables[0].Rows[0].ItemArray.GetValue(0).ToString();
                Output_Number = ds.Tables[1].Rows[0].ItemArray.GetValue(0).ToString();
                Clients.Caller.postClient(Display_Message);
                // dt_return = Display_Message;
                return Output_Number;
            }
            catch (Exception ex)
            {
                Clients.Caller.postClient(ex.Message + " : " + ex.StackTrace);
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;
            }
        }

        [HubMethodName("deleteData")]
        public object deleteData(int ID, string mod_)
        {
            DataSet ds = new DataSet();
            string Display_Message;
            string Output_Number;
            try
            {
                switch (mod_)
                {
                    case "Received_Broadcast_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;
                    case "Sentout_Broadcast_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Disco_Log_Delete":
                        BLL.WriteLog("Disco_Log");
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Consumer_Record_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Revenue_Operation_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Sale_Revenue_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Genco_Log_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;

                    case "Genco_Record_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;
                    case "User_Delete":
                        ds = DAL.sp_Delete(ID, mod_);
                        break;
                }
                Display_Message = ds.Tables[0].Rows[0].ItemArray.GetValue(0).ToString();
                Output_Number = ds.Tables[1].Rows[0].ItemArray.GetValue(0).ToString();
                Clients.Caller.postClient(Output_Number);
                // dt_return = Display_Message;
                return Output_Number;
            }
            catch (Exception ex)
            {
                Clients.Caller.postClient(ex.Message + " : " + ex.StackTrace);
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return ex.Message + " : " + ex.StackTrace;
            }
        }


    }
}