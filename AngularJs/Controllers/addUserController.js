application.controller('addUserController', ['$scope', '$window', '$log', '$rootScope', 'DTOptionsBuilder','DTColumnBuilder','DTColumnDefBuilder', function ($scope, $window,$log,$rootscope, DTOptionsBuilder , DTColumnBuilder, DTColumnDefBuilder) {
    console.log(new Date());
    var date = new Date().toLocaleString();

    $scope.dtColumnDefs = [
    DTColumnDefBuilder.newColumnDef([1,2,3,4,5,6]).withOption('order', [])
    ];

  // $scope.dtOptions = DTOptionsBuilder.newOptions().withButtons(['print']);


   // console.log(new Date().toLocaleDateString() +  ' ' + '/' + ' ' + new Date().toLocaleTimeString());
    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }

    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
        var data_ = data;
        
            console.log(data_);
            jQuery("#div_alert").html = "";
            jQuery("#div_alert").append(data_);
            $scope.feedbackLabel = data_;
            $scope.$apply();
    };

    $scope.securedHub.client.fetchMain = function (dt_Users, dt_Designation, dt_Division) {
        $scope.userTable = dt_Users;
        $scope.DesignationTables = dt_Designation
        $scope.divisionTables = dt_Division
        $scope.$apply();
    };

    $scope.start = $.connection.hub.start(); // Starts Hub
    
    $scope.start.done(function () {
        
        $scope.securedHub.server.FetcMain();
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        console.log("connected");
        console.log(localStorage["mail"]);
        $scope.adduser = function () {
            $scope.securedHub.server.AddUser($scope.name, $scope.email, $scope.phone, $scope.DesignationDropDown, $scope.divisionDropDown, 'Testing1234', date);
            $scope.securedHub.server.FetcMain();
            $scope.name = ' '; $scope.email = ' '; $scope.phone = ' '; $scope.DesignationDropDown = ' '; $scope.divisionDropDown = ' ';
        }
    });


}]);