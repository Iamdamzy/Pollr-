/// <reference path="App.js" />
/// <reference path="../Services/CaseService.js" />

application.controller('applications', ['$scope', '$log', '$rootScope', '$window', function ($scope, $log, $rootScope, $window) {
    var isLoggiedIn = "" + localStorage["mail"];
    if (isLoggiedIn.length === 9) {
        window.location.assign("login.html");
    }


    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.fetchMyApplications = function (data, _data) {
        console.log(_data);
        $scope.caseInformation = data;
        $scope.viewcaseInformation = _data;
        
        $scope.$apply();
    };
    $scope.editAction = function (caseInfo, _data) {
        var currentRow;
        if (_data == 0) {
            localStorage['view'] = 'viewpage';
           //jQuery('#general').addClass('display-hide');
           //document.getElementById('general').style.display = "block";
            currentRow = $scope.viewcaseInformation[$scope.viewcaseInformation.indexOf(caseInfo)];
        }
        else {
           //document.getElementById("general").style.visibility = "visible";
            currentRow = $scope.caseInformation[$scope.caseInformation.indexOf(caseInfo)];
        }
        localStorage["fileNumber"] = currentRow.FileNumber;
        localStorage["Status"] = currentRow.CaseStatus;
        //localStorage["CurrentUserEmail"] = currentRow.CurrentUserEmail;
        console.log(localStorage["Status"]);
        $window.location.href = '/CaseDetails.aspx';

    };




    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        console.log(localStorage["mail"]);
        console.log(localStorage["Designation"]);
        $scope.securedHub.server.FetchMyApplications(localStorage["mail"]);
    })
    .fail(function () {
        $log.info("Failed Connection");
    });
}]);