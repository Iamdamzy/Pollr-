/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
/// <reference path="../../View/MotorHaul.html" />
/// <reference path="../../View/MotorHaul.html" />
iApp.controller('login_Contoller', ["$scope","$state", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope,$state, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    localStorage["mail"] = " ";
    sHub.on('getFeedBack', function (dt) {
        var data_ = dt;
        console.log(data_[0].User_Email);

            localStorage["mail"] = data_[0].User_Email;
            localStorage["Role"] = data_[0].Role_Name;
            switch (data_[0].Role_Name) {
                case "TCN":
                    $window.location.href = '/psmis/Base.aspx?Role=' + data_[0].Role_Name;
                 
                    break;
                case "Disco":
                    $window.location.href = '/psmis/Base.aspx?Role=' + data_[0].Role_Name;
                    break;
                case "Genco":
                    $window.location.href = '/psmis/Base.aspx?Role=' + data_[0].Role_Name;
                    break;
                case "Admin":
                   //$state.go('dashboard');
                    $window.location.href = '/psmis/Base.aspx?Role=' + data_[0].Role_Name;
                    break;
        }
       //else {
       //    jQuery("#div_alert").html('');
       //    jQuery("#div_alert").html(data_);
       //    $scope.$apply();
       // }
    });
    sHub.on('loginError', function (data_) {
     //   alert("shub on");
        console.log(data_);
    });
    $scope.login = function () {
        sHub.invoke('VerifyLogin', $scope.email_ln, $scope.password_ln, function () {
        });
    };

    $scope.changepassword = function () {
        sHub.invoke('changePassword', $scope.form.email, $scope.form.newpassword, $scope.form.oldpassword, function (data) {
            console.log(data);
            if (parseInt(data) === 200) {
                toastr.success('Password Sucessfully Changed', 'Operation Status');
                $scope.form = {};
            }
            else {
                toastr.error("An Error Occured while Execting the Required Operation");
            }
        });
    }

}]);