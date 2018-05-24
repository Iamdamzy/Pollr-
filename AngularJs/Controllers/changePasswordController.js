application.controller('changePasswordController', function ($scope, $window, $location) {


   
    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }
    

    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
            var data_= data;
            console.log(data_);
            jQuery("#div_alert").html("");
            jQuery("#div_alert").append(data_);
            $scope.feedbackLabel = data_;
            $scope.$apply();

    };

    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        console.log("connected");
        console.log(localStorage["mail"]);
        //$scope.oldpass = $location.search().mail
        //$scope.oldpass = "ddwdsycugyuhijewrkdc";
        //sessionStorage.getItem("mail")
        $scope.CheckMatch = function () {
            if (!($scope.newpass === $scope.confirmpass)) {
                $scope.feedbackLabel = "Passwords Mismatch";
                return;
            }
            $scope.feedbackLabel = "";
        }
        $scope.changePassword = function () {
            
            $scope.securedHub.server.ChangePassword(localStorage["mail"], $scope.confirmpass, $scope.oldpass);

        }
    });


});