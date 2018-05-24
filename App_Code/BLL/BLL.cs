using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.CSharp;
using System.Data;
using System.Net.Mail;
using System.Configuration;

/// <summary>
/// Summary description for BLL
/// </summary>
namespace Pollr {
public class BLL
{ 
        public static void WriteLog(string msg)
        {
            if (msg.ToString().Contains("Thread was being aborted"))
            {
                //do nothing
            }
            else
            {
                HttpContext context = HttpContext.Current;

                string _path = null;
                _path = "~/App_Log\\errorLog.txt";
                //_path = @"App_Log\ErrorLog.txt";
                _path = context.Server.MapPath(_path);
                System.IO.StreamWriter writer = new System.IO.StreamWriter(_path, true);            
                writer.WriteLine(msg + " | " + DateTime.Now + System.Environment.NewLine);
                writer.Close();
            }
            //End If
        }

        public static string DataTableToJSON(DataTable table)
        {
            var JSONString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                JSONString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JSONString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == table.Rows.Count - 1)
                    {
                        JSONString.Append("}");
                    }
                    else
                    {
                        JSONString.Append("},");
                    }
                }
                JSONString.Append("]");
            }
            return JSONString.ToString();
        }

        public static string welcomeMessage(string session_ln)
        {
            return "Welcome " + session_ln;
        }

        public static bool SendEmail(string mailToSendTo, string subjectOfMail, string message)
        {
            bool status = false;
            try
            {
                MailMessage email = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                // set up the Gmail server
                smtp.EnableSsl = true;
                smtp.Port = 587;
                smtp.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["mail"].ToString(), ConfigurationManager.AppSettings["password"].ToString());
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                email.IsBodyHtml = true;
                email.Subject = subjectOfMail;
                email.From = new MailAddress("bigdaddy2030@gmail.com", "PTAD");
                email.Body = message;
                email.To.Add(mailToSendTo.Trim());
                smtp.Send(email);
                status = true;
            }
            catch
            {

            }
            return status;

        }


        public static string OutPut_Message(string Output_Number, string Display_Message, bool MultiMode = false, string Modal = "")
        {
            string Message = null;
            switch (Output_Number)
            {
                case "2627":
                    Message = "<div class='alert alert-block alert-danger fade in'>";
                    Message = Message + "<button type='button'class='close' onclick='' data-dismiss='alert'></button>";
                    Message = Message + "<h4 class='alert-heading'>Error!</h4>";
                    Message = Message + "<p>" + Display_Message + "</p></br>";
                    if (MultiMode == true)
                    {
                        Message = Message + "<a class='btn red' data-toggle='modal' href='#" + Modal + "' onclick=''>View Error Log</a>&nbsp;";
                    }
                    else
                    {
                        Message = Message + "<a class='btn red' href='#' onclick='BLL.Retry();'>Try Again</a>&nbsp;";
                    }
                    Message = Message + "<a class='btn blue' href='#' onclick='' data-dismiss='alert' >Cancel</a>";
                    Message = Message + "</div>";
                    break;
                case "0":
                    Message = "<div class='alert alert-block alert-success fade in'>";
                    Message = Message + "<button type='button' class='close' onclick='' data-dismiss='alert'></button>";
                    Message = Message + "<h4 class='alert-heading'>Success!</h4>";
                    Message = Message + "<p>" + Display_Message + "</p>";
                    Message = Message + "</div>";
                    break;
                case "1":
                    Message = "<div class='alert alert-block alert-danger fade in'>";
                    Message = Message + "<button type='button' class='close' onclick='' data-dismiss='alert'></button>";
                    Message = Message + "<h4 class='alert-heading'>Error!</h4>";
                    Message = Message + "<p>" + Display_Message + "</p>";
                    Message = Message + "</div>";
                    break;
                case "-1":
                    Message = "<div class='alert alert-block alert-warning fade in'>";
                    Message = Message + "<button type='button' class='close' onclick='' data-dismiss='alert'></button>";
                    Message = Message + "<h4 class='alert-heading'>Warning!</h4>";
                    Message = Message + "<p>" + Display_Message + "</p>";
                    Message = Message + "</div>";
                    break;
                case "547":
                    Message = "<div class='alert alert-block alert-danger fade in'>";
                    Message = Message + "<button type='button' class='close' onclick='' data-dismiss='alert'></button>";
                    Message = Message + "<h4 class='alert-heading'>Error!</h4>";
                    Message = Message + "<p>" + Display_Message + "</p>";
                    Message = Message + "</div>";
                    break;
                default:
                    Message = "";
                    break;
            }
            return Message;
        }

    }

}