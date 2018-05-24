/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Revenue_Contoller', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };

    sHub.invoke('getAllRevenue', function (data_) {
        $scope.Revenue_Data = data_;
    });

  
   

}]);
