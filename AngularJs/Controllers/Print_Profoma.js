/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Print_Profoma', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };
    $scope.Pitems = localStorage["Pitems"];

    $scope.PPitems = JSON.parse($scope.Pitems);
   // console.log($scope.PPitems);

    $scope.JOperations = localStorage["JOperations"];
    if ($scope.JOperations === undefined) {
        console.log($scope.JOperations)
    } else {
        $scope.JJOps = JSON.parse($scope.JOperations);
    };
    console.log($scope.JJOps);
    $scope.Job_Id = localStorage["Job_Id"];
    $scope.JJClient_Name = localStorage["JJClient_Name"];
    $scope.JJDateCreated = localStorage["JJDateCreated"];
    $scope.JJCollection_Date = localStorage["JJCollection_Date"];
    
  

}]);
