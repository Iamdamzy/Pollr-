/// <reference path="App.js" />
/// <reference path="../Services/CaseService.js" />

application.controller('createCase', ['$scope', '$log', '$rootScope', '$window', function ($scope, $log, $rootScope, $window) {
    //$scope.format_number = function () {
    //    var val = $scope.salaryBox;
    //    while (/(\d+)(\d{3})/.test(val.toString())) {
    //        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    //    }
    //    return val;

    //}
    $scope.form = {};
    $scope.state = {};
    $scope.local = {};
    var TimeCreated = new Date(new Date().getTime()).toLocaleTimeString();
    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }
    var statttttttt;
    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.fetchComplaintAndBank = function (dt_Complaint, dt_Bank, dt_states, dt_locals) {
        $scope.complaintTable = dt_Complaint;
        $scope.bankTables = dt_Bank;
        $scope.state = dt_states;
        //console.log($scope.state);
        statttttttt = dt_locals;
       // $scope.local = dt_locals;
        $scope.$apply();

    };

    $scope.securedHub.client.fetchCase = function (data) {
        $scope.caseInformation = data;
        $scope.$apply();
    };

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
        var data_ = data;
        jQuery("#div_alert").html("");
        jQuery("#div_alert").append(data_);

    };
    $scope.editAction = function (caseInfo) {
        var currentRow = $scope.caseInformation[$scope.caseInformation.indexOf(caseInfo)];
        localStorage["fileNumber"] = currentRow.filenumber;
        localStorage["Status"] = currentRow.Status;
        $window.location.href = '/CaseDetails.aspx';

    };

    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        $scope.securedHub.server.FetchComplaintAndBank();
        $scope.securedHub.server.FetchCaseInfo();
        $scope.$watch('form.states', function () {
            $scope.locall = statttttttt.filter(function (s) {
                return s.StateId == $scope.form.states.StateId;
            });
        });
        $scope.savecase = function () {
            var Iscomplaint, subjectMatter, complaintType, caseName;
            if ($('input[name="caseComplainttype"]:checked', '#caseComplaint').val() === 'Yes') {
                Iscomplaint = "Yes";
                subjectMatter = "NIL";
                caseName = $scope.form.complaintDropDown;
            } else {
                Iscomplaint = "No";
                caseName = $scope.form.subjectMatterBox;
                complaintType = "NIL";
            };
            if ($('#Select1').val() === 'Others') {
                caseName = $scope.form.complaintTypeBox;
            };
            var checkstate;
            var checklocals;
            if ($('#statesdrp option:selected').text() == '---Select State---') {
                checkstate = 'NULL'
            } else {
                checkstate = $scope.form.states.Name;
            };

            if ($('#localsdrp option:selected').text() == '---Select LGA---') {
                checklocals = 'NULL'
            } else {
                checklocals = $scope.form.locals.LocalName;
            }
            var email = localStorage["mail"];

            //$scope.securedHub.server.addCase($scope.fileNumber, $scope.liasonOfficeBox, Iscomplaint, caseName,
            //    $scope.lastNameBox, $scope.middleNameBox, $scope.fNameBox, checkstate, $scope.locals, $scope.addressBox,
            //    $scope.phoneBox, $scope.emailBox, $scope.firstAppointment, $scope.retirementDate, $scope.gradeLevelBox, $scope.salaryBox,
            //    $scope.pensioneerDropDown, 'Supporting Document', $scope.BankNameDropDown, $scope.accountNumber, 'PENDING', email, email, '', TimeCreated)
            //.done(function () {
            //});
            $scope.securedHub.server.addCase($scope.form.fileNumber, $scope.form.liasonOfficeBox, Iscomplaint, caseName,
    $scope.form.lastNameBox, $scope.form.middleNameBox, $scope.form.fNameBox, checkstate, checklocals, $scope.form.addressBox,
    $scope.form.phoneBox, $scope.form.emailBox, $scope.form.firstAppointment, $scope.form.retirementDate, $scope.form.gradeLevelBox, $scope.form.salaryBox,
    $scope.form.pensioneerDropDown, 'Supporting Document', $scope.form.BankNameDropDown, $scope.form.accountNumber, 'PENDING', email, email, '', TimeCreated)
.done(function () {
setTimeout(function () {
        jQuery("#div_alert").fadeOut('slow');
    }, 5000);
    $scope.form = {};
});
            $scope.securedHub.server.FetchCaseInfo();
            $scope.securedHub.server.AddCaseHistory($scope.form.fileNumber, email, email, 'PENDING');
        }
    })
    .fail(function () {
        $log.info("Failed Connection");
    });



    $('#caseComplaint input').on('change', function () {
        if ($('input[name="caseComplainttype"]:checked', '#caseComplaint').val() === 'Yes') {
            $('#complaintType').removeClass('display-hide');
            $('#subjectMatter').addClass('display-hide');
        } else {
            $('#complaintType').addClass('display-hide');
            $('#subjectMatter').removeClass('display-hide');
            $('#statecomplaintType').addClass('display-hide');
            $('#Select1').text() == '---Select Complaint Type---';
        }
    });

    $('#Select1').on('change', function () {
        if ($('#Select1 option:selected').text() == 'Others') {
            $('#subjectMatter').addClass('display-hide');
            $('#statecomplaintType').removeClass('display-hide');

        } else {
            $('#statecomplaintType').addClass('display-hide');
        }
    });

    $('#statesdrp').on('change', function () {
       // alert(checkstate);
        if ($('#statesdrp option:selected').text() == '---Select State---') {
            $('#localstate').addClass('display-hide');
        } else {
            $('#localstate').removeClass('display-hide');
        }

    });

    $('#submit').on('click', function () {
        console.log("Hello");


    })
}]);