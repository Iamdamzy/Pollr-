/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Job_Contoller', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };

    $scope.jvproforma_id = localStorage["Proforma_Id"];
    $scope.jvclient_name = localStorage["PClient_Name"];
   
    $scope.ptotal = localStorage["PTotal"];


    sHub.on('getdrpFetch', function (data_Category, data_Stock_Category, data_Job_Type, data_Staff) {

        $scope.drp_Job_Type = data_Job_Type;
        $scope.drp_Staff = data_Staff;
    });
     
    $scope.load_drps = function () {
        $scope.drp_Job_Typee = $scope.drp_Job_Type;
        alert('hello');
    }


    sHub.on('postJob', function (data) {
        console.log('hello');
        console.log(data);
    })

    $scope.job_save = function () {
        var job_operation = $('.mt-repeater').repeaterVal();
        var job_operation_S = JSON.stringify(job_operation);
        console.log(job_operation_S);
        sHub.invoke('jobPost', localStorage["Proforma_Id"], 'Jack', $scope.form.keynumber, $scope.form.caracc,
                    $scope.form.lightcondi, $scope.form.vehiclecondi, $scope.form.bodycondi,
                    $scope.form.frscreen, $scope.form.fuellevel,job_operation_S, $scope.form.fObservation,
                    $scope.form.collection_Date, $scope.ptotal, function (data) {
    if (parseInt(data) === 200) {
        toastr.success('Job Card Sucessfully Saved', 'Operation Status');
        $scope.form = {};

        sHub.invoke('getAllJob', function (data) {
            $scope.Job_data = data;
            console.log($scope.Job_data);
        });
        window.location.herf = 'Job_log.aspx'
    }
    else if (parseInt(data) === 500) {
        toastr.warning("An Operation as already been carried out on this profoma");
    }
    else {
        toastr.error("An Error Occurred when trying to Perform this Operation")
    }
                    });
        

    }


    sHub.invoke('getAllJob', function (data) {
        $scope.Job_data = data;
    });

    sHub.invoke('drpfetchget', function () {

    });

    $scope.Print_JobCard = function (data) {
        $scope.copy = angular.copy($scope.Job_data[$scope.Job_data.indexOf(data)])
        console.log($scope.copy);
        localStorage["Job_Id"] = $scope.copy.Job_Id
        localStorage["JJClient_Name"] = $scope.copy.Client_Name;
        localStorage["JJDateCreated"] = $scope.copy.DateCreated;
        localStorage["JJCollection_Date"] = $scope.copy.Collection_Date;
        localStorage["JOperations"] = $scope.copy.Job_Operation;
    }







}]);
