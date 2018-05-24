/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Profoma_Log', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };
    sHub.invoke('getAllProfoma', function (data_) {
        $scope.Profoma_Data = data_;
    });


    $scope.createJob = function (data) {
        $scope.copy = angular.copy($scope.Profoma_Data[$scope.Profoma_Data.indexOf(data)])

        localStorage["Proforma_Id"] = $scope.copy.Profoma_Id;
        localStorage["PClient_Name"] = $scope.copy.Client_Name;
        localStorage["PTotal"] = $scope.copy.Total;
       // console.log(localStorage["Proforma_Id"] + ' ' + localStorage["PClient_Name"]);

        console.log($scope.copy);
        //localStorage["Client_Id"] = $scope.copy.Client_Id;
        //localStorage["Client_Name"] = $scope.copy.Client_Name;
        //localStorage["Client_Phone"] = $scope.copy.Client_Phone;
        //localStorage["Address"] = $scope.copy.Client_Address;

       $window.location.href = 'Create_Job.aspx';
    }

    $scope.PProfoma_Id = 0;
    $scope.Print = function (data) {
        $scope.copy = angular.copy($scope.Profoma_Data[$scope.Profoma_Data.indexOf(data)])

        localStorage["PProfoma_Id"] = $scope.copy.Profoma_Id
        localStorage["PPClient_Name"] = $scope.copy.Client_Name;
        localStorage["PPSub_total"] = $scope.copy.Sub_total;
        localStorage["discountrate"] = $scope.copy.Discount;
        localStorage["PPVat"] = $scope.copy.Vat;
        localStorage["PPTotal"] = $scope.copy.Total;
        localStorage["Pitems"] = $scope.copy.Profoma_Item;
        localStorage["PPDateCreated"] = $scope.copy.DateCreated
        
        localStorage["PPDiscount"] = (localStorage["discountrate"] / 100) * localStorage["PPSub_total"]

        console.log(localStorage["PPDiscount"]);
        // console.log(localStorage["Proforma_Id"] + ' ' + localStorage["PClient_Name"]);
        //
        //console.log($scope.copy);
        //$scope.Pitems = localStorage["Pitems"];

        //$scope.PPitems = JSON.parse($scope.Pitems);
       // console.log($scope.PPitems);
        //$window.location.href = 'print_proforma.html';
    }

    $scope.PProfoma_Id = localStorage["PProfoma_Id"];
    $scope.PPClient_Name = localStorage["PPClient_Name"];
    $scope.PPDateCreated = localStorage["PPDateCreated"];
    $scope.PPSub_total = localStorage["PPSub_total"];
    $scope.PPDiscount = localStorage["PPDiscount"];
    $scope.PPTotal = localStorage["PPTotal"];
    $scope.PPVat = localStorage["PPVat"];
    console.log(localStorage["discountrate"]);
    $scope.PPdicount_rate = parseInt(localStorage["discountrate"]) + '%'
    
}]);
