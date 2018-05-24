/// <reference path="App.js" />
/// <reference path="../Services/CaseService.js" />

application.controller('bankController', ['$scope', '$log', '$rootScope', '$window', function ($scope, $log, $rootScope, $window) {

    $scope.securedHub = null; // Holds the reference to Hub

    $scope.securedHub = $.connection.securedhub;

    $scope.securedHub.client.getFeedBack = function (data) {
        //initialize a variable to the input param
        var data_ = data;

        console.log(data_);
        jQuery("#div_alert").html("");
        jQuery("#div_alert").append(data_);
        $scope.$apply();
    };

    $scope.securedHub.client.fetchBank = function (data) {
        $scope.BanksTable = data;
        $scope.$apply();
    };



    $scope.deleteBank = function (bankInfo) {
        
        var currentRow = $scope.BanksTable[$scope.BanksTable.indexOf(bankInfo)];
        $scope.securedHub.server.DeleteBank(currentRow.BankName);
        $scope.securedHub.server.FetchBank();
    };
    var oldBankName='';
    $scope.prepareToEditBank = function (bankInfo) {

        var currentRow = $scope.BanksTable[$scope.BanksTable.indexOf(bankInfo)];
        $scope.banknameUpdate = currentRow.BankName;
        oldBankName = currentRow.BankName;
    };

    $scope.editBank = function () {

        $scope.securedHub.server.EditBank($scope.banknameUpdate, oldBankName);
        $scope.securedHub.server.FetchBank();
    };

    $scope.start = $.connection.hub.start(); // Starts Hub
    $scope.start.done(function () {
        $scope.welcomeMessage = "Welcome " + localStorage["mail"];
        console.log(localStorage["mail"]);
        $scope.securedHub.server.FetchBank();
        $scope.addbank = function () {
            $scope.securedHub.server.AddBank($scope.bankname);
            $scope.securedHub.server.FetchBank();
        };
    })
    .fail(function () {
        $log.info("Failed Connection");
    });
}]);