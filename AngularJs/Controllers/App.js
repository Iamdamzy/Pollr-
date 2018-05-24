/// <reference path="Client_Controller.js" />
/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../View/MotorHaul.html" />
/// <reference path="Job_Controller.js" />
//var application = angular.module('iApp', ['datatables', 'datatables.buttons']);
var local = [];
local = window.location.href.split("/");
var serverUrI = window.location.origin + '/psmis'
var iApp = angular.module('iApp', ['ui.router', 'oc.lazyLoad', 'datatables', 'datatables.buttons']);
// + / + local[3]
iApp.value('$sHub', 'securedHub');
iApp.value('serverUrl', serverUrI);

//iApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
//   // $locationProvider.hashPrefix('');
//    $routeProvider
//        .when("/Dashboard", {
//            templateUrl: "dashboard_base.html"
//        })
//        .when("/Client", {
//            templateUrl: "dashboard_base.html",
//            controller: "Client_Contoller"
//        })
//        .when("/Proforma", {
//            templateUrl: "View/Profoma_Log.html",
//            controller: "Profoma_Log"
//        }) 
//        .when("/Job", {
//            templateUrl: "View/Job_Log.html",
//            controller: "Job_Contoller"
//        })
//        .when("/Stock", {
//            templateUrl: "View/GarageStock.html",
//            controller: "Stock_Contoller"
//        })
//        .when("/Revenue", {
//            templateUrl: "View/RevenuePage.html",
//            controller: "Revenue_Contoller"
//        })
//        .when("/CreateJob", {
//            templateUrl: "View/Create_Job.html",
//            controller: "Job_Contoller"
//         })
//        .otherwise({
//            redirectTo: "/Dashboard"
//        })
//  //  $locationProvider.html5Mode(true);
//}]);

iApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    alert(localStorage["Role"]);
    //if (localStorage["Role"].length > 1) {
    //    $urlRouterProvider.otherwise("dashboard");
    //}
    //else {
    //    $urlRouterProvider.otherwise("index");
    //}
 //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    //iApp.stateProvider = $stateProvider
    $stateProvider
        //Setup Navigation
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: "dashboard_base.html",
            controller: 'DashboardControllerMain'
        })
        .state("dashboardmain", {
            url: "/dashboardmain",
            templateUrl: "dashboard_arh.html",
            controller: 'DashboardController'
        })
        .state("disco_log", {
            url: "/disco_log",
            templateUrl: "disco_log.html",
            controller: 'DiscoController'
        })
        .state("disco_consumer_record", {
            url: "/disco_consumer_record",
            templateUrl: "disco_consumer_record.html",
            controller: 'DiscoController'
        })
        .state("disco_revenue_operation", {
            url: "/disco_revenue_operation",
            templateUrl: "disco_revenue_operation.html",
            controller: 'DiscoController'
        })
        .state("disco_sales_revenue", {
            url: "/disco_sales_revenue",
            templateUrl: "disco_sales_revenue.html",
            controller: "DiscoController"
        })
        .state("disco_equipment", {
            url: "/disco_equipment",
            templateUrl: "disco_equipment.html",
            controller: "DiscoController"
        })
        .state("genco_log", {
             url: "/genco_log",
             templateUrl: "genco_log.html",
            controller: "GencoController"
         })
         .state("genco_daily_record", {
             url: "/genco_daily_record",
             templateUrl: "genco_daily_record.html",
             controller: "GencoController"
         })
        .state("genco_equipment", {
            url: "/genco_equipment",
            templateUrl: "genco_equipment.html",
            controller: "GencoController"
        })
        .state("tcn_received_broadcast", {
            url: "/tcn_received_broadcast",
            templateUrl: "tcn_received_broadcast.html",
            controller: "TcnController"
        })
        .state("tcn_sentout_broadcast", {
            url: "/tcn_sentout_broadcast",
            templateUrl: "tcn_sentout_broadcast.html",
            controller: "TcnController"
        })
        .state("tcn_equipment", {
            url: "/tcn_equipment",
            templateUrl: "tcn_equipment.html",
            controller: "DashboardController"
        })
         .state("system_users", {
             url: "/system_users",
             templateUrl: "system_users.html",
             controller: "ManagePsmisController"
            })
        //.state("index", {
        //     url: "/index",
        //     templateUrl: "index.html",
        //    controller: "login_Controller"
        //    })
    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
}])


iApp.run(["$rootScope", "hubProxy", "$sHub", "$state", "DTOptionsBuilder", function ($rootScope, hubProxy, $sHub,$state, DTOptionsBuilder) {

    //$rootScope.$state = $state; // state to be accessed from view

    $rootScope.hub = hubProxy(hubProxy.defaultServer, $sHub);
    $rootScope.hub.start();

    $rootScope.vm = {};
    $rootScope.vm.dtOptions = DTOptionsBuilder.newOptions().withButtons([
                                          {extend: 'copy',text: '<i class="fa fa-files-o"></i> Copy',titleAttr: 'Copy'},
                                          {extend: 'print',text: '<i class="fa fa-print" aria-hidden="true"></i> Print',titleAttr: 'Print'},
                                          {extend: 'excel',text: '<i class="fa fa-file-text-o"></i> Excel',titleAttr: 'Excel'},
                                          {extend: 'pdf',text: '<i class="fa fa-file-pdf-o"></i> Pdf',titleAttr: 'PDF'}]);
}]);



iApp.controller('LogoutController', function ($location, $scope, $window) {

    alert("iAPP");
    $scope.logout = function () {
        $window.localStorage.clear();
        window.location.assign("login.html");
    }

});



iApp.directive('numberFormat', ['$filter', '$parse', function ($filter, $parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {

            var decimals = $parse(attrs.decimals)(scope);

            ngModelController.$parsers.push(function (data) {
                // Attempt to convert user input into a numeric type to store
                // as the model value (otherwise it will be stored as a string)
                // NOTE: Return undefined to indicate that a parse error has occurred
                //       (i.e. bad user input)
                var parsed = parseFloat(data);
                return !isNaN(parsed) ? parsed : undefined;
            });

            ngModelController.$formatters.push(function (data) {
                //convert data from model format to view format
                return $filter('number')(data, decimals); //converted
            });

            element.bind('focus', function () {
                element.val(ngModelController.$modelValue);
            });

            element.bind('blur', function () {
                // Apply formatting on the stored model value for display
                var formatted = $filter('number')(ngModelController.$modelValue, decimals);
                element.val(formatted);
            });
        }
    }
}]);












