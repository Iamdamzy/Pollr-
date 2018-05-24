/// <reference path="App.js" />

application.controller('loginController', ['$scope', '$window', function ($scope, $window) {
    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;
    $scope.securedHub.client.getFeedBack = function (data, num, email, Designation, Division) {
        //initialize a variable to the input param
        var data_ = data;
        if (num === '0') {
            localStorage["mail"] = email;
            localStorage["Designation"] = Designation;
            localStorage["Division"] = Division;
            if (Division === "Admin") {

                $window.location.href = '/Dashboard.aspx?Division=' + Division;
            }
            else {

                $window.location.href = '/application.aspx?Division=' + Division;
            }
        }
        else {
            console.log(data_);
            jQuery("#div_alert").html('');
            jQuery("#div_alert").html(data_);
            $scope.$apply();
        }
    };
    $scope.year = new Date().getFullYear();
    $scope.start = $.connection.hub.start(); // Starts Hub
         $scope.start.done(function () {
             console.log("connected");
             $scope.login = function () {
                 $scope.securedHub.server.VerifyLogin($scope.mailBox, $scope.pass);
             }

             $scope.forgotPassword = function () {
                 $scope.securedHub.server.ForgotPassword($scope.mailBoxForgot);
             }
         });
    

}]);