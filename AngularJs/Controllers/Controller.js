/// <reference path="../Controllers/App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('testing', ["$scope", "SharedData", "hubProxy", "$sHub", "$rootScope", function ($scope, SharedData, hubProxy, $sHub, $rootScope) {
    var sHub = $rootScope.hub;
    //document.getElementById("demoButton").onclick = SharedData.crawlWeb;
    console.log(sHub);
    var param = {name:'Oyebanji',age:'30'};

    $scope.click = function () {
        sHub.invoke('testthis', 'tobi', angular.toJson(param), function (_data) {
            // console.log('i' + _data);
            alert('welcome');
            //console.log(sHub.connection.id)
        });

    };

    sHub.on('supply', function (dt,pa) {
        console.log(dt,pa);
    });



  


    }]);
