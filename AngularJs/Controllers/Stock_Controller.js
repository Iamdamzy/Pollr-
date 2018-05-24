/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('Stock_Contoller', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};
    var email_ln = localStorage["mail"];
    if (email_ln === undefined) {
        window.location.assign("login.html");
    };
    sHub.invoke('drpfetchstockcat', function ( data_Stock_Category) {
        console.log(data_Stock_Category)
        $scope.form.drpStock_Category = data_Stock_Category;

    });

    sHub.invoke('getAllStock', function (data_) {
        $scope.Stock_Data = data_;
    });

    $scope.stock_save = function () {
        sHub.invoke('stockPost', $scope.form.sname, '101', $scope.form.sdescription, $scope.form.sqty, function (data) {
                        if (parseInt(data) === 200) {
                            toastr.success(' Stock Sucessfully Saved', 'Operation Status');
                            $scope.form = {};
                            sHub.invoke('getAllStock', function (data_) {
                                $scope.Stock_Data = data_;
                            });
                        }
                        else {
                            toastr.error("An Error Occured while Execting the Required Operation");
                        }
                    });

    }


    //-----Hiding the Update Button to Show the Save Button // Using the same Modal for Save and Edit
    $('#btn_registerClient').on('click', function () {
        $('#btn_save').removeClass('hidden');
        $('#btn_pick_edit').addClass('hidden');
    })

    $scope.pick_edit = function (data) {
        //-----Hiding the Save Button to Show the Update Button // Using the same Modal for Save and Edit 
        $('#btn_save').addClass('hidden');
        $('#btn_pick_edit').removeClass('hidden');
        $scope.copy = angular.copy($scope.Client_Data[$scope.Client_Data.indexOf(data)]);

        $scope.form.cname = $scope.copy.Client_Name;
        $scope.form.cnumber = $scope.copy.Client_Phone;
        $scope.form.cemail = $scope.copy.Client_Email;
        $scope.form.caddress = $scope.copy.Client_Address;
        $scope.form.ccategory = $scope.copy.Client_Category_Id;
        $scope.form.cdob = $scope.copy.Client_DOB;
    }

    $scope.update = function () {
        console.log($scope.copy.Client_Id);

        $scope.edit = {
            Client_Name: $scope.form.cname, Client_Phone: $scope.form.cnumber,
            Client_Email: $scope.form.cemail, Client_Address: $scope.form.caddress,
            Client_DOB: $scope.form.cdob
        };

        sHub.invoke('clientUpdate', $scope.copy.Client_Id, angular.toJson($scope.edit), function (data) {
            if (parseInt(data) === 200) {
                toastr.success('Record Successfully Updated', 'Operation Status');
                sHub.invoke('getAllClient', function (data_) {
                    $scope.Client_Data = data_;
                });
                $scope.form = {};
            }
            else {
                toastr.error("An Error Occured while Execting the Required Operation");
            }
        });

    };

    $scope.delete = function (data) {
        $scope.copy = angular.copy($scope.Client_Data[$scope.Client_Data.indexOf(data)]);
        console.log($scope.copy.Client_Id);
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this record",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function (isConfirm) {
            if (isConfirm) {
                sHub.invoke('clientDelete', $scope.copy.Client_Id, function (data) {
                    if (parseInt(data) === 200) {
                        swal("Deleted!", "Record has been deleted!", "success");
                        sHub.invoke('getAllClient', function (data_) {
                            $scope.Client_Data = data_;
                        });
                    } else {
                        swal("Cancelled", "Server not responding", "error");
                    }
                });
            } else {
                swal("Cancelled", "Record is safe :)", "error");
            }
        });
    };

    $scope.profoma = function (data) {
        $scope.copy = angular.copy($scope.Client_Data[$scope.Client_Data.indexOf(data)]);

        localStorage["Client_Id"] = $scope.copy.Client_Id;
        localStorage["Client_Name"] = $scope.copy.Client_Name;
        localStorage["Client_Phone"] = $scope.copy.Client_Phone;
        localStorage["Address"] = $scope.copy.Client_Address;

        $window.location.href = 'profoma.html';
    }


    sHub.on('postClient', function (dt) {
        console.log(dt);

    });

}]);
