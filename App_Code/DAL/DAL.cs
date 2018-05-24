using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.IO;
using Microsoft.ApplicationBlocks.Data;
/// <summary>
/// DAL - Data Access Layer 
/// </summary>
namespace Pollr
{
    public class _DAL
    {
        //public static string Car_Connect = ConnectionString.CarVue_Connect();

        public static string Psmis_Connect = ConnectionString.Psmis_Connect();

        public DataSet sp_User_Login(string email_ln, string password_ln)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Email", email_ln),
                new SqlParameter("@Password", password_ln)

            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_UserLogin", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }



        public DataSet sp_User_Test(string connection_id)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Connection_ID", connection_id)

            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_User_Test", @params);
                return ds;

            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }


        public DataSet sp_Dashboard_(DateTime date_from, DateTime date_to)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Date_From", date_from),
                new SqlParameter("@Date_To", date_to)

            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_Dashboard_", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Change_Password(string email_ln, string password_ln , string oldpassword_ln)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Email", email_ln),
                new SqlParameter("@NewPassword", password_ln),
                 new SqlParameter("@OldPassword", oldpassword_ln)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_ChangePassword", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_User_Insert(string User_FullName, string User_Email, string User_PhoneNumber, string User_Password, int CreatedBy, int Role_ID, string Role_Name, int Company_ID)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@User_FullName", User_FullName),
                new SqlParameter("@User_Email", User_Email),
                new SqlParameter("@User_PhoneNumber",  User_PhoneNumber),
                new SqlParameter("@User_Password", User_Password),
                new SqlParameter("@CreatedBy", CreatedBy),
                new SqlParameter("@Role_ID",  Role_ID),
                new SqlParameter("@Role_Name", Role_Name),
                new SqlParameter("@Company_ID",  Company_ID),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_User_Insert", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }


        public DataSet sp_DashBoard(String module_ln, String date_ln, String column_ln)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Module", module_ln),
                new SqlParameter("@Date", date_ln),
                new SqlParameter("@Column", column_ln)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_dashboard", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_DashBoard_Main()
        {
            try
            {
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_DashBoard"); 
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_DashBoard_Graph(string date, string columnName)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Date", date),
                new SqlParameter("@columnName", columnName)

            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_DashBoard_Graph", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Disco_Insert(string Name, string Code_Name, string Email, string Phone_Number,
                                       string Address,  string Website , string State_Covered, int State_Id,
                                       string longitude , string latitude , DateTime Date_Incorporated)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Name", Name),
                new SqlParameter("@Code_Name", Code_Name),
                new SqlParameter("@Email", Email),
                new SqlParameter("@Phone_Number", Phone_Number),
                new SqlParameter("@Address", Address),
                new SqlParameter("@Website", Website),
                new SqlParameter("@State_Covered", State_Covered),
                new SqlParameter("@State_Id", State_Id),
                new SqlParameter("@longitude", longitude),
                new SqlParameter("@latitude", latitude),
                new SqlParameter("@Date_Incorporated", Date_Incorporated),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_Disco_Insert", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Broadcast_Received_Insert(int genco_id, float power_received, DateTime reporting_date)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Genco_ID", genco_id),
                new SqlParameter("@Power_Received", power_received),
                new SqlParameter("@Reporting_Date", reporting_date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_Broadcast_Received_Insert", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Broadcast_Received_Update(int ID,int genco_id, float power_received, DateTime reporting_date)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Genco_ID", genco_id),
                new SqlParameter("@Power_Received", power_received),
                new SqlParameter("@Reporting_Date", reporting_date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Broadcast_Received_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }
        public DataSet sp_Broadcast_Sent_Insert(int disco_id, float power_sent, DateTime reporting_date)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@Disco_ID", disco_id),
                new SqlParameter("@Power_Sent", power_sent),
                new SqlParameter("@Reporting_Date", reporting_date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "sp_Broadcast_Sent_Insert", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Broadcast_Sent_Update(int ID, int disco_id, float power_sent, DateTime reporting_date)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Disco_ID", disco_id),
                new SqlParameter("@Power_Sent", power_sent),
                new SqlParameter("@Reporting_Date", reporting_date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Broadcast_Sent_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }


        public DataSet sp_Disco_Consumer_Insert(int Disco_Id,int Consumer_Ubran, int Consumer_Rural, int Consumer_Residential, int Consumer_Industrial, 
            string E_Distribution_Residential, string E_Distribution_Industrial,int Created_By, DateTime Reporting_Date)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@Disco_Id", Disco_Id),
                new SqlParameter("@Consumer_Ubran", Consumer_Ubran),
                new SqlParameter("@Consumer_Rural", Consumer_Rural),
                new SqlParameter("@Consumer_Residential", Consumer_Residential),
                new SqlParameter("@Consumer_Industrial", Consumer_Industrial),
                new SqlParameter("@E_Distribution_Residential", E_Distribution_Residential),
                new SqlParameter("@E_Distribution_Industrial", E_Distribution_Industrial),
                new SqlParameter("@Created_By", Created_By),
                new SqlParameter("@Reporting_Date", Reporting_Date),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Consumer_Insert]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Disco_Consumer_Update(int ID, int Disco_Id, int Consumer_Ubran, int Consumer_Rural, int Consumer_Residential, int Consumer_Industrial,
                string E_Distribution_Residential, string E_Distribution_Industrial, DateTime Reporting_Date)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Disco_Id", Disco_Id),
                new SqlParameter("@Consumer_Ubran", Consumer_Ubran),
                new SqlParameter("@Consumer_Rural", Consumer_Rural),
                new SqlParameter("@Consumer_Residential", Consumer_Residential),
                new SqlParameter("@Consumer_Industrial", Consumer_Industrial),
                new SqlParameter("@E_Distribution_Residential", E_Distribution_Residential),
                new SqlParameter("@E_Distribution_Industrial", E_Distribution_Industrial),
                new SqlParameter("@Reporting_Date", Reporting_Date),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Consumer_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }


        public DataSet sp_Disco_Revenue_Operation(int Disco_Id, float Revenue_Energy, float Revenue_Others, float Total_Revenue, float OE_Fuel, float OE_Purchased_Power,
             float OE_Generation, float OE_Transmission, float OE_Distribution, float OE_Consumer_Services, float OE_Bad_Debts,
             float OE_Administration, float OE_Amortisation, float OE_Depreciation, float OE_Total, float Electicity_Sale,float Average_Price_Kobo,
             float Operation_Income, float Interest_Deposit, float Interest_Paid, float Net_Income, DateTime Record_Date,int CreatedBy)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@Disco_Id", Disco_Id),
                new SqlParameter("@Revenue_Energy", Revenue_Energy),
                new SqlParameter("@Revenue_Others", Revenue_Others),
                new SqlParameter("@Total_Revenue", Total_Revenue),
                new SqlParameter("@OE_Fuel", OE_Fuel),

                new SqlParameter("@OE_Purchased_Power", OE_Purchased_Power),
                new SqlParameter("@OE_Generation", OE_Generation),
                new SqlParameter("@OE_Transmission", OE_Transmission),
                new SqlParameter("@OE_Distribution", OE_Distribution),
                new SqlParameter("@OE_Consumer_Services", OE_Consumer_Services),

                new SqlParameter("@OE_Bad_Debts", OE_Bad_Debts),
                new SqlParameter("@OE_Administration", OE_Administration),
                new SqlParameter("@OE_Amortisation", OE_Amortisation),
                new SqlParameter("@OE_Depreciation", OE_Depreciation),
                new SqlParameter("@OE_Total", OE_Total),

                new SqlParameter("@Electicity_Sale", Electicity_Sale),
                new SqlParameter("@Average_Price_Kobo", Average_Price_Kobo),
                new SqlParameter("@Operation_Income", Operation_Income),
                new SqlParameter("@Interest_Deposit", Interest_Deposit),
                new SqlParameter("@Interest_Paid", Interest_Paid),

                new SqlParameter("@Net_Income", Net_Income),
                new SqlParameter("@Record_Date", Record_Date),
                new SqlParameter("@CreatedBy", CreatedBy),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Revenue_Operation_Insert]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Disco_Revenue_Operation_Update(int ID,int Disco_Id, float Revenue_Energy, float Revenue_Others, float Total_Revenue, float OE_Fuel, float OE_Purchased_Power,
            float OE_Generation, float OE_Transmission, float OE_Distribution, float OE_Consumer_Services, float OE_Bad_Debts,
            float OE_Administration, float OE_Amortisation, float OE_Depreciation, float OE_Total, float Electicity_Sale, float Average_Price_Kobo,
            float Operation_Income, float Interest_Deposit, float Interest_Paid, float Net_Income, DateTime Record_Date)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Disco_Id", Disco_Id),
                new SqlParameter("@Revenue_Energy", Revenue_Energy),
                new SqlParameter("@Revenue_Others", Revenue_Others),
                new SqlParameter("@Total_Revenue", Total_Revenue),
                new SqlParameter("@OE_Fuel", OE_Fuel),

                new SqlParameter("@OE_Purchased_Power", OE_Purchased_Power),
                new SqlParameter("@OE_Generation", OE_Generation),
                new SqlParameter("@OE_Transmission", OE_Transmission),
                new SqlParameter("@OE_Distribution", OE_Distribution),
                new SqlParameter("@OE_Consumer_Services", OE_Consumer_Services),

                new SqlParameter("@OE_Bad_Debts", OE_Bad_Debts),
                new SqlParameter("@OE_Administration", OE_Administration),
                new SqlParameter("@OE_Amortisation", OE_Amortisation),
                new SqlParameter("@OE_Depreciation", OE_Depreciation),
                new SqlParameter("@OE_Total", OE_Total),

                new SqlParameter("@Electicity_Sale", Electicity_Sale),
                new SqlParameter("@Average_Price_Kobo", Average_Price_Kobo),
                new SqlParameter("@Operation_Income", Operation_Income),
                new SqlParameter("@Interest_Deposit", Interest_Deposit),
                new SqlParameter("@Interest_Paid", Interest_Paid),

                new SqlParameter("@Net_Income", Net_Income),
                new SqlParameter("@Record_Date", Record_Date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Revenue_Operation_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }




        public DataSet sp_genco_daily_record_Insert(int Power_Id, float Power_Generated, float Power_Sent_Out, float Spinning_Reserved, float Total_PeakHR, float TotalOff_PeakHR,
                                             float Cost_Operation, float TurnOver,  DateTime Record_Date,int CreatedBy)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@Power_ID", Power_Id),
                new SqlParameter("@Power_Generated", Power_Generated),
                new SqlParameter("@Power_Sent_Out", Power_Sent_Out),
                new SqlParameter("@Spinning_Reserved", Spinning_Reserved),
                new SqlParameter("@Total_PeakHR", Total_PeakHR),

                new SqlParameter("@TotalOff_PeakHR", TotalOff_PeakHR),
                new SqlParameter("@Cost_Operation", Cost_Operation),
                new SqlParameter("@TurnOver", TurnOver),

                new SqlParameter("@Record_Date", Record_Date),
                new SqlParameter("@CreatedBy", CreatedBy),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Genco_Record_Insert]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_genco_daily_record_Update(int ID, int Power_Id, float Power_Generated, float Power_Sent_Out, float Spinning_Reserved, float Total_PeakHR, float TotalOff_PeakHR,
                                     float Cost_Operation, float TurnOver, DateTime Record_Date)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Power_ID", Power_Id),
                new SqlParameter("@Power_Generated", Power_Generated),
                new SqlParameter("@Power_Sent_Out", Power_Sent_Out),
                new SqlParameter("@Spinning_Reserved", Spinning_Reserved),
                new SqlParameter("@Total_PeakHR", Total_PeakHR),

                new SqlParameter("@TotalOff_PeakHR", TotalOff_PeakHR),
                new SqlParameter("@Cost_Operation", Cost_Operation),
                new SqlParameter("@TurnOver", TurnOver),

                new SqlParameter("@Record_Date", Record_Date),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Genco_Record_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Disco_Sales_Account_Insert(int DISCO_ID, float Sales_Residential, float Sales_Commercial, float Sales_Industrial, float Total_Sale, float Account_Receivable_Government,
                                     float Account_Receivable_Private, float Account_Receivable_Customer, DateTime Record_Date, int CreatedBy)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@DISCO_ID", DISCO_ID),
                new SqlParameter("@Sales_Residential", Sales_Residential),
                new SqlParameter("@Sales_Commercial", Sales_Commercial),
                new SqlParameter("@Sales_Industrial", Sales_Industrial),
                new SqlParameter("@Total_Sale", Total_Sale),

                new SqlParameter("@Account_Receivable_Government", Account_Receivable_Government),
                new SqlParameter("@Account_Receivable_Private", Account_Receivable_Private),
                new SqlParameter("@Account_Receivable_Customer", Account_Receivable_Customer),

                new SqlParameter("@Record_Date", Record_Date),
                new SqlParameter("@CreatedBy", CreatedBy),
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Sales_Account_Insert]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }


        public DataSet sp_Disco_Sales_Account_Update(int ID,int DISCO_ID, float Sales_Residential, float Sales_Commercial, float Sales_Industrial, float Total_Sale, float Account_Receivable_Government,
                             float Account_Receivable_Private, float Account_Receivable_Customer, DateTime Record_Date)
        {
            try
            {

                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@DISCO_ID", DISCO_ID),
                new SqlParameter("@Sales_Residential", Sales_Residential),
                new SqlParameter("@Sales_Commercial", Sales_Commercial),
                new SqlParameter("@Sales_Industrial", Sales_Industrial),
                new SqlParameter("@Total_Sale", Total_Sale),

                new SqlParameter("@Account_Receivable_Government", Account_Receivable_Government),
                new SqlParameter("@Account_Receivable_Private", Account_Receivable_Private),
                new SqlParameter("@Account_Receivable_Customer", Account_Receivable_Customer),

                new SqlParameter("@Record_Date", Record_Date)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Disco_Sales_Account_Update]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

        public DataSet sp_Delete(int ID,string Module)
        {
            try
            {
                SqlParameter[] @params = {
                new SqlParameter("@ID", ID),
                new SqlParameter("@Module", Module)
            };
                DataSet ds = new DataSet();
                ds = SqlHelper.ExecuteDataset(Psmis_Connect, CommandType.StoredProcedure, "[sp_Delete]", @params);
                return ds;
            }
            catch (Exception ex)
            {
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace);
                return null;
            }
            finally
            {
            }
        }

    }
}