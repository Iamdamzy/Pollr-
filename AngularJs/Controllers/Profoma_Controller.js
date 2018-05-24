/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Profoma_Contoller', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };

    $scope.vclient_name = localStorage["Client_Name"];
    $scope.vclient_address = localStorage["Address"];
    $scope.vclient_phone = localStorage["Client_Phone"];

    $scope.sub_total = 0;
    $scope.discount = 0;
    $scope.e_total = 0;
    $scope.form.vat = 0;
    $scope.ee_total = 0;

    $scope.profoma_cal = function () {
        var profoma = $('.mt-repeater').repeaterVal();
        $scope.tcost_labour = 0;
        $scope.tcost_parts = 0;
        $scope.tcost_lub = 0;
        angular.forEach(profoma.items, function (value, key) {
           // value.Qty = value.CstPart = value.CstLabour = value.CstLub = 0;
            var cost_parts = parseInt(value.Qty) * parseInt(value.CstPart);
            var cost_labour = parseInt(value.Qty) * parseInt(value.CstLabour);
            var cost_lub = parseInt(value.Qty) * parseInt(value.CstLub)
            $scope.tcost_parts = $scope.tcost_parts + cost_parts;
            $scope.tcost_labour = $scope.tcost_labour + cost_labour;
            $scope.tcost_lub = $scope.tcost_lub + cost_lub;
        });
        $scope.tcost_parts;
        $scope.tcost_labour;
        $scope.tcost_lub;

        $scope.sub_total = $scope.tcost_parts + $scope.tcost_labour + $scope.tcost_lub;
        $scope.form.discount_rate = 0;
        $scope.discount_amount = 0;

        $scope.discount = $scope.sub_total * ($scope.form.discount_rate / 100);
        // console.log($scope.discount);
    
        $scope.e_total = $scope.sub_total - $scope.discount;
        $scope.form.vat = (0.05 * $scope.e_total);
        $scope.ee_total = (0.05 * $scope.e_total) + $scope.e_total;
       // console.log($scope.e_total);
        $('#profoma_table').removeClass('hidden');
    }

    $scope.discount_rerate = function () {
        $scope.discount = $scope.sub_total * ($scope.form.discount_rate / 100);
        $scope.e_total = $scope.sub_total - $scope.discount;
        $scope.form.vat = (0.05 * $scope.e_total);
        $scope.ee_total = (0.05 * $scope.e_total) + $scope.e_total;
        alert($scope.form.discount_rate);
    }
    alert($scope.form.discount_rate);
    $scope.profoma_save = function () {
        var profoma = $('.mt-repeater').repeaterVal();
        var profoma_S = JSON.stringify(profoma);
       alert($scope.form.discount_rate);
        $scope.param = {
            Client_Id: localStorage["Client_Id"], Car_RegNumber: $scope.form.Car_RegNo, Vehicle_Model: $scope.form.Vehicle_Model,
            Chasis_Number: $scope.form.Chasis_Number, Profoma_Item: profoma_S, Discount: $scope.form.discount_rate, Sub_total: $scope.sub_total, Vat: $scope.form.vat, Total: $scope.ee_total
        };

        sHub.invoke('profomaPost', angular.toJson($scope.param), function (data) {
            if (parseInt(data) === 200) {
                toastr.success('Profoma Sucessfully Saved', 'Operation Status');
                $scope.form = {};
                window.location.href = 'Profoma_Log.aspx';
            }
            else {
                toastr.error("An Error Occured while Execting the Required Operation");
            }
        });

       

  

    }

    $scope.profoma = function (data) {
        $scope.copy = angular.copy($scope.Client_Data[$scope.Client_Data.indexOf(data)]);

        localStorage["Client_Id"] = $scope.copy.Client_Id;
        localStorage["Client_Name"] = $scope.copy.Client_Name;
        localStorage["Client_Phone"] = $scope.copy.Client_Phone;
        localStorage["Address"] = $scope.copy.Client_Address;

        $window.location.href = 'profoma.html';
    }

}]);
