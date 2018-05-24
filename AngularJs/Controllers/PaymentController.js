/// <reference path="App.js" />
/// <reference path="../Services/CaseService.js" />

application.controller('PaymentController', ['$scope', '$log', '$rootScope', '$window', function ($scope, $log, $rootScope, $window) {

    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }

    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
        var data_ = data;
        console.log(data_)
        console.log(data_);
        jQuery("#div_alert").html("");
        jQuery("#div_alert").append(data_);
        //$scope.$apply();

    };

    $scope.securedHub.client.displayPayment = function (data) {
        //initialize a variable to the input param
        $scope.dt_Payment = data;
        $scope.$apply();

    };

    $scope.securedHub.client.displayPayment2 = function (data) {
        //initialize a variable to the input param
        $scope.securedHub.server.Payment();

    };

    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        console.log("con");
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        $scope.securedHub.server.Payment();
        
    })
    .fail(function () {
        $log.info("Failed Connection");
    });

}]);