/***
GLobal Directives
***/
//iApp.directive('dateRangePicker', function () {
//    return {
//        restrict: 'AC',
//        link: function (scope, elem, attrs) {
//            if (!jQuery().daterangepicker) {
//                return;
//            }
//            $(elem).daterangepicker({
//                opens: (App.isRTL() ? 'left' : 'right'),
//                startDate: moment().subtract('days', 29),
//                endDate: moment(),
//                //minDate: '01/01/2012',
//                //maxDate: '12/31/2014',
//                dateLimit: {
//                    days: 60
//                },
//                showDropdowns: true,
//                showWeekNumbers: true,
//                timePicker: false,
//                timePickerIncrement: 1,
//                timePicker12Hour: true,
//                ranges: {
//                    'Today': [moment(), moment()],
//                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
//                    'Last 7 Days': [moment().subtract('days', 6), moment()],
//                    'Last 30 Days': [moment().subtract('days', 29), moment()],
//                    'This Month': [moment().startOf('month'), moment().endOf('month')],
//                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
//                },
//                buttonClasses: ['btn'],
//                applyClass: 'green',
//                cancelClass: 'default',
//                format: 'MM/DD/YYYY',
//                separator: ' to ',
//                locale: {
//                    applyLabel: 'Apply',
//                    fromLabel: 'From',
//                    toLabel: 'To',
//                    customRangeLabel: 'Custom Range',
//                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
//                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//                    firstDay: 1
//                }
//            },
//               function (start, end) {
//                   alert(start);
//                   console.log(elem.find('span'));
//                   $(elem).find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
//               }
//            );

//            // this is very important fix when daterangepicker is used in modal. in modal when daterange picker is opened and mouse clicked anywhere bootstrap modal removes the modal-open class from the body element.
//            // so the below code will fix this issue.
//            $(elem).on('click', function () {
//                if ($(elem).is(":visible") && $('body').hasClass("modal-open") == false) {
//                    $('body').addClass("modal-open");
                  
//                }
//                console.log($(elem).find('span').html());
//            });

//            //Set the initial state of the picker label
//            $(elem).find('span').html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
//            console.log($(elem).find('span').html());

            
//        }
//    };
//});

iApp.directive('pickers', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            switch (attrs["pickers"]) {
                case "range":
                    elem.daterangepicker({
                        format: 'MMMM DD, YYYY',
                        showDropdowns: true,
                        "opens": "left",
                        "alwaysShowCalendars": false,
                        "startDate": moment().format('MM/DD/YYY'),
                        "endDate": moment().format('MM/DD/YYY'),
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')]
                        }
                    }, function (start, end, label) {
                       // $('#id_date').html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                        $('#id_date').html($(elem).val());
                    });
                    //Set the initial state of the picker label                 
                    $(elem).val(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                    
                   // $('#id_date').html($(elem).val());
                    break;
                case "date":
                    $(elem).datepicker({
                        rtl: App.isRTL(),
                        orientation: "left",
                        autoclose: true
                    });
                    $(document).scroll(function () {
                        $('#responsive .date-picker').datepicker('place'); //#modal is the id of the modal
                    });
                    break;
            }
        }
    };
});

// Route State Load Spinner(used on page or content load)
iApp.directive('ngSpinnerBar', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // by defult hide the spinner bar
          
                element.addClass('hide'); // hide spinner bar by default
             
                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide'); // show spinner bar  
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    //Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])
