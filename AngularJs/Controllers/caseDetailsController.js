application.controller('caseDetailsController', function ($scope, $window) {


    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }


    $('#Select1').change(function () {
        if ($('#Select1 option:selected').val() === "FORWARD TO") {
            $("#notesdiv").removeClass("display-hide");
            $("#assigntodiv").removeClass("display-hide");
            $("#addcaseHistoryButton").removeClass("display-hide");
        }
        else if ($('#Select1 option:selected').val() === "") {
            $("#notesdiv").addClass("display-hide");
            $("#assigntodiv").addClass("display-hide");
            $("#addcaseHistoryButton").addClass("display-hide");
        }
        else {
            $("#notesdiv").addClass("display-hide");
            $("#assigntodiv").addClass("display-hide");
            $("#addcaseHistoryButton").removeClass("display-hide");
        }

    });
    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
        var data_ = data;
        console.log(data_);
        jQuery("#div_alert").html("");
        jQuery("#div_alert").append(data_);
        $scope.$apply();

    };

    $scope.inittable = function () {
        angular.element('#sample11').dataTable({

        // Internationalisation. For more info refer to http://datatables.net/manual/i18n
    "language": {
        "aria": {
            "sortAscending": ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
            },
        "emptyTable": "No data available in table",
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu" : "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
                },

                    // Or you can use remote translation file
                    //"language": {
                    //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

                    // setup buttons extentension: http://datatables.net/extensions/buttons/
                    buttons: [
                    {
                    extend: 'print', className: 'btn dark btn-outline'
                },
                    { extend: 'pdf', className: 'btn green btn-outline'
                },
                    { extend : 'csv', className: 'btn purple btn-outline '
                    }
                ],

                    // setup responsive extension: http://datatables.net/extensions/responsive/
                        responsive : true,

                    // setup colreorder extension: http://datatables.net/extensions/colreorder/
                        colReorder : {
                    reorderCallback: function () {
                    console.log('callback');
                }
                },

            "order": [
                [0, 'asc']
],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                    // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                    // So when dropdowns used the scrollable div should be removed. 
                    //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                    });
    };

    $scope.securedHub.client.fetchCaseHistory = function (data, count) {
        $scope.caseHistory = data;

        console.log($scope.caseHistory);
        if (!(count === '0')) {
            document.getElementById("addcaseHistoryButton").style.visibility = "hidden";
        }
        else {
        }
        $scope.$apply();
    };

    $scope.securedHub.client.loadPeople = function (dt_thePeople) {
        //initialize a variable to the input param
        $scope.thePeopleTable = dt_thePeople;
        $scope.$apply();

    };

   

    $scope.securedHub.client.showCaseInfo = function (caseDetails) {
        //initialize a variable to the input param
        var caseArray = caseDetails.split(":");
        console.log(caseDetails);
        $scope.FirstName = caseArray[6];
        $scope.middlename = caseArray[5];
        $scope.lastname = caseArray[4];
        $scope.state = caseArray[7];
        $scope.LGA = caseArray[8];
        $scope.mail = caseArray[11];
        $scope.phone = caseArray[10];
        $scope.bank = caseArray[18];
        $scope.accountNumber = caseArray[19];
        $scope.addr = caseArray[9];
        $scope.dateOffirstAp = caseArray[12];
        $scope.retirement = caseArray[13];
        $scope.grade = caseArray[14];
        $scope.sal = caseArray[15];
        $scope.typeOfPensioner = caseArray[16];
        $scope.fileNumber = caseArray[0];
        $scope.liasonOffice = caseArray[1];
        $scope.complaint = caseArray[2];
        $scope.caseName = caseArray[3];
        $scope.$apply();
        

    };
    //console.log(localStorage["Designation"]);
    if (!(localStorage["Designation"] == "DivisionalManager_Account" || localStorage["Designation"] == "DivisionalManager_Admin")) {
        $('#approve').addClass("display-hide");
       // $('#reject').addClass("display-hide");
    }
    if (localStorage['view'] == 'viewpage') {
        $('#operations').addClass("display-hide");
    };
    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        console.log(localStorage["Status"]);
        var email = localStorage["mail"];
        var fileNumber_ln = localStorage["fileNumber"];

       // console.log(localStorage["Designation"]);
        $scope.securedHub.server.FetchFullCaseInfo(fileNumber_ln);
        $scope.securedHub.server.FetchPeopleToAssignTo(fileNumber_ln, localStorage["Designation"], localStorage["Division"], email);
        $scope.securedHub.server.FetchCaseHistory(fileNumber_ln, email, localStorage["Designation"]);

        $scope.addCaseHistory = function () {
            var action = '';
            var whoToSignTo = '';
            if ($scope.actionDropDown === 'RESOLVE') {
                action = 'RESOLVED';
                whoToSignTo = email;
            }
            else if ($scope.actionDropDown === 'KIV') {
                action = 'KIV';
                whoToSignTo = email;
            }
            else if ($scope.actionDropDown === 'FORWARD TO') {
                 action = 'FORWARDED';
                whoToSignTo = $scope.assingToDropDown;
            }
            else {
                action = $scope.actionDropDown
                whoToSignTo = email;
            }
            $scope.securedHub.server.AddCaseHistory(fileNumber_ln, email, whoToSignTo, action, $scope.notes);
            $window.location.href = '/allapplication.aspx';
        }
        
    });



});

application.directive('trtr', function () {
    var param;
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.on('click', function (e) {
                //console.log(attrs.trtr)
                var data = JSON.parse(attrs.trtr)
                var tr = elem.closest('tr');
                if (elem.hasClass('open')) {
                    elem.removeClass('open')
                    tr.siblings('tr.trsub').remove();
                } else {
                    elem.addClass('open')
                    tr.after('<tr class="trsub"><td colspan="100" style="padding:30px;text-align:left">' + data.CaseNotes + '<td><tr>')
                }
            });
        },
    };
});

application.directive('angDatatable', [function () {
    return {
        scope: true,
        link: function (scope, elem, attrs) {
            console.log(elem)
            scope.$watch(attrs.angDatatable, function (newVal, oldVal) {
                if (newVal == oldVal) {
                    return
                }
                return
                elem.dataTable({
                    "language": {
                        "lengthMenu": "_MENU_"
                    }
                });
            });
        }
    };
}])