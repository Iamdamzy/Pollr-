/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Job_Contoller_Testing', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};

    console.log('hello');
    $scope.jvproforma_id = localStorage["Proforma_Id"];
    $scope.jvclient_name = localStorage["PClient_Name"];
   
    $scope.ptotal = localStorage["PTotal"];

    alert($scope.ptotal);

    alert('hey');

    sHub.on('getdrpFetch', function (data_Category, data_Stock_Category, data_Job_Type, data_Staff) {

        $scope.form.drp_Job_Type = data_Job_Type;
        $scope.form.drp_Staff = data_Staff;

    });
     
    $scope.load_drps = function () {
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
//        sHub.invoke('jobPost', localStorage["Proforma_Id"], 'Jack', $scope.form.keynumber, $scope.form.caracc,
//                    $scope.form.lightcondi, $scope.form.vehiclecondi, $scope.form.bodycondi,
//                    $scope.form.frscreen, $scope.form.fuellevel,job_operation_S, $scope.form.fObservation,
//                    $scope.form.collection_Date, $scope.ptotal, function (data) {
//    if (parseInt(data) === 200) {
//        toastr.success('Job Card Sucessfully Saved', 'Operation Status');
//        $scope.form = {};

//        sHub.invoke('getAllJob', function (data) {
//            $scope.Job_data = data;
//            console.log($scope.Job_data);
//        });

//        $window.location.herf = 'Job_log.html'
//    }
//    else {
//        toastr.error("An Error Occured while Execting the Required Operation");
//    }
//});
    }


    sHub.invoke('getAllJob', function (data) {
        $scope.Job_data = data;
    });

    sHub.invoke('drpfetchget', function () {

    });






}]);
