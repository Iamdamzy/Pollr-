using System.Configuration;
using Microsoft.SqlServer;

//Creating a Class That Holds The Connection Between The Database And The Application 
// Check the Web.config for more reference !!!
namespace Pollr {

public class ConnectionString
{
    public static string Connection()
    {
            string dConnectionstring = ConfigurationManager.ConnectionStrings["SDMS_ConnectionString"].ConnectionString;
            return dConnectionstring;
    }

        public static string Connection2()
        {
            string connect = ConfigurationManager.ConnectionStrings["SDMS_ConnectionString2"].ConnectionString;
            return connect;
        }

        public static string CarVue_Connect()
        {
            string connect = ConfigurationManager.ConnectionStrings["CARVUE_ConnectionString"].ConnectionString;
            return connect;
        }

        public static string Psmis_Connect()
        {
            string connect = ConfigurationManager.ConnectionStrings["PSMIS_ConnectionString"].ConnectionString;
            return connect;
        }
    }

}