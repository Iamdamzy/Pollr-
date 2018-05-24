using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
/// <summary>
/// Summary description for Employee
/// </summary>

namespace Pollr
{
    public class _ManageObject {


    }

    public class _Obj_Disco
    {
        public string Name { get; set; }
        public string Code_Name { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public string State_Covered { get; set; }
        public int State_ID { get; set; }
        public DateTime Date_Created { get; set; }
        public string longitude { get; set; }
        public string latitude { get; set; }
        public DateTime Date_Incorporated { get; set; }

    }


    public class _Obj_Broadcast_R
    {
        public int ID { get; set; }
        public int Genco_ID { get; set; }
        public float Power_Recevied { get; set; }
        public DateTime Recording_Date { get; set; }
    }

    public class _Obj_Broadcast_S
    {
        public int ID { get; set; }
        public int Disco_ID { get; set; }
        public float Power_Sent{ get; set; }
        public DateTime Recording_Date { get; set; }
    }

    public class _Obj_Disco_Consumer_Record
    {
        public int ID { get; set; }
        public int Consumer_Ubran { get; set; }
        public int Consumer_Rural { get; set; }
        public int Consumer_Residential { get; set; }
        public int Consumer_Industrial { get; set; }
        public string E_Distribution_Residential { get; set; }
        public string E_Distribution_Industrial { get; set; }
        public int Created_By { get; set; }
        public DateTime Date_Created { get; set; }
        public DateTime Reporting_Date { get; set; }
        public int Disco_ID { get; set; }
    }
    public class _Obj_Revenue_D
    {
            public int ID { get; set; }
            public int Disco_ID { get; set; }
            public float  Revenue_Energy { get; set; }
            public float  Revenue_Others { get; set; }
            public float  Total_Revenue { get; set; }
            public float  OE_Fuel { get; set; }
            public float  OE_Purchased_Power { get; set; }
            public float  OE_Generation { get; set; }
            public float  OE_Transmission { get; set; }
            public float  OE_Distribution { get; set; }
            public float  OE_Consumer_Services { get; set; }
            public float  OE_Bad_Debts { get; set; }
            public float  OE_Administration { get; set; }
            public float  OE_Amortisation { get; set; }
            public float  OE_Depreciation { get; set; }
            public float  OE_Total { get; set; }
            public float  Electicity_Sale { get; set; }
            public float  Average_Price_Kobo { get; set; }
            public float  Operation_Income { get; set; }
            public float  Interest_Deposit { get; set; }
            public float  Interest_Paid { get; set; }
            public float  Net_Income { get; set; }
            public DateTime Record_Date { get; set; }
            public DateTime Date_Created { get; set; }
            public int CreatedBy { get; set; }
        }

    public class _Obj_Power_Generation
    {
        public int ID { get; set; }
        public int Power_ID { get; set; }
        public float Power_Generated { get; set; }
        public float Power_Sent_Out { get; set; }
        public float Spinning_Reserved { get; set; }
        public float Total_PeakHR { get; set; }
        public float TotalOff_PeakHR { get; set; }
        public float Cost_Operation { get; set; }
        public float TurnOver { get; set; }
        public DateTime Record_Date { get; set; }
        public int CreatedBy { get; set; }
    }

    public class _Obj_Sale_Account
    {
        public int ID { get; set; }
        public int DISCO_ID { get; set; }
        public float Sales_Residential { get; set; }
        public float Sales_Commercial { get; set; }
        public float Sales_Industrial { get; set; }
        public float Total_Sale { get; set; }
        public float Account_Receivable_Government { get; set; }
        public float Account_Receivable_Private { get; set; }
        public float Account_Receivable_Customer { get; set; }
        public DateTime Record_Date { get; set; }
        public DateTime Date_Created { get; set; }
        public int CreatedBy { get; set; }
    }

    public class _Obj_Users
    {
        public int ID { get; set; }
        public string User_FullName { get; set; }
        public string User_Email { get; set; }
        public string User_PhoneNumber { get; set; }
        public string User_Password { get; set; }
        public int CreatedBy { get; set; }
        public int Role_ID { get; set; }
        public string Role_Name { get; set; }
        public int Company_ID { get; set; }
    }


}