/// <reference path="../../Scripts/angular.js" />
/// <reference path="App.js" />
/// <reference path="../Services/services.js" />
iApp.controller('DashboardController', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};

    //operation_monthly_graph();
    //sHub.on('getdashboardmain', function (data_Total_Actual, data_Total_Power, data_Total_Energy, data_Total_Sold) {
    //    var _data = data_Total_Actual; var _data_P = data_Total_Power; var _data_E = data_Total_Energy; var _data_S = data_Total_Sold;
    //    $scope.total_actual = parseFloat(_data[0].TOTAL_ACT).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    //    $('#adminearns').val($scope.total_actual);
    //    $scope.total_power = parseFloat(_data_P[0].TOTAL_Power).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    //    $('#adminearns').val($scope.total_power);
    //});

 
    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        var d = _data[0]; var d_ = _data[1]; var e = _data[2]; var e_ = _data[3];
        var x = _data[4]; var x_ = _data[5]; var z = _data[6]; var z_ = _data[7];
        $scope.energy_operation_13 = _data[8]; $scope.energy_operation_14 = _data[9];
        $scope.operation_monthly = _data[10]; var y = _data[11];
        $scope.total_actual = parseFloat(d[0].TOTAL_ACT).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#gen_13').val($scope.total_actual);
        $scope.total_power = parseFloat(d_[0].TOTAL_Power).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#power_13').val($scope.total_power);
        $scope.total_energy = parseFloat(e[0].TOTAL_Energy).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#energy_13').val($scope.total_energy);
        $scope.total_sold = parseFloat(e_[0].TOTAL_Sold).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#sold_13').val($scope.total_sold);

        $scope.total_actual_14 = parseFloat(x[0].TOTAL_ACT_14).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#gen_14').val($scope.total_actual_14);
        $scope.total_power_14 = parseFloat(x_[0].TOTAL_Power_14).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#power_14').val($scope.total_power_14);
        $scope.total_energy_14 = parseFloat(z[0].TOTAL_Energy_14).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#energy_14').val($scope.total_energy_14);
        $scope.total_sold_14 = parseFloat(z_[0].TOTAL_Sold_14).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $('#sold_14').val($scope.total_sold_14);

        $('#station_count').val(y[0].TOTAL);

        App.init();
        initChart();
    });


    var initChart = function initChart() {
        if (!jQuery.plot) {
            return;
        }

        function showChartTooltip(x, y, xValue, yValue) {
            $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 40,
                border: '0px solid #ccc',
                padding: '2px 6px',
                'background-color': '#fff'
            }).appendTo("body").fadeIn(200);
        }

        var data = [];
        var totalPoints = 250;
        var visitors = [
            ['JAN', $scope.operation_monthly[0].TOTAL],
            ['FEB', $scope.operation_monthly[1].TOTAL],
            ['MAR', $scope.operation_monthly[2].TOTAL],
            ['APR', $scope.operation_monthly[3].TOTAL],
            ['MAY', $scope.operation_monthly[4].TOTAL],
            ['JUN', $scope.operation_monthly[5].TOTAL],
            ['JUL', $scope.operation_monthly[6].TOTAL],
            ['AUG', $scope.operation_monthly[7].TOTAL],
            ['SEP', $scope.operation_monthly[8].TOTAL],
            ['OCT', $scope.operation_monthly[9].TOTAL],
            ['NOV', $scope.operation_monthly[10].TOTAL],
            ['DEC', $scope.operation_monthly[11].TOTAL]
        ];

        if ($('#site_statistics').size() != 0) {

            $('#site_statistics_loading').hide();
            $('#site_statistics_content').show();

            var plot_statistics = $.plot($("#site_statistics"), [{
                data: visitors,
                lines: {
                    fill: 0.6,
                    lineWidth: 0
                },
                color: ['#f89f9f']
            }, {
               data: visitors,
                points: {
                    show: true,
                    fill: true,
                    radius: 5,
                    fillColor: "#f89f9f",
                    lineWidth: 3
                },
                color: '#fff',
                shadowSize: 0
            }],

                {
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            var previousPoint = null;
            $("#site_statistics").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' MW');
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });

        }
    }

    $('.monthly_graph').on('change', function () {
        sHub.invoke('dashBoardMain_graph', $('#date option:selected').val(), $('#column option:selected').val(), function (data) {
            $scope.operation_monthlyy = data;
            console.log($scope.operation_monthlyy[0].total);
            var visitors = [
        ['JAN', $scope.operation_monthlyy[0].total],
        ['FEB', $scope.operation_monthlyy[1].total],
        ['MAR', $scope.operation_monthlyy[2].total],
        ['APR', $scope.operation_monthlyy[3].total],
        ['MAY', $scope.operation_monthlyy[4].total],
        ['JUN', $scope.operation_monthlyy[5].total],
        ['JUL', $scope.operation_monthlyy[6].total],
        ['AUG', $scope.operation_monthlyy[7].total],
        ['SEP', $scope.operation_monthlyy[8].total],
        ['OCT', $scope.operation_monthlyy[9].total],
        ['NOV', $scope.operation_monthlyy[10].total],
        ['DEC', $scope.operation_monthlyy[11].total]
            ];

            // console.log(newData);
            //plot_statistics.setData(visitors);
            //// plot_statistics.setupGrid(); // use it later
            //plot_statistics.draw();
            //plot_statistics.triggerRedrawOverlay();
            function showChartTooltip(x, y, xValue, yValue) {
                $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y - 40,
                    left: x - 40,
                    border: '0px solid #ccc',
                    padding: '2px 6px',
                    'background-color': '#fff'
                }).appendTo("body").fadeIn(200);
            }

            var data = [];
            var totalPoints = 250;

            if ($('#site_statistics').size() != 0) {

                $('#site_statistics_loading').hide();
                $('#site_statistics_content').show();

                var plot_statistics = $.plot($("#site_statistics"), [{
                    data: visitors,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#f89f9f']
                }, {
                    data: visitors,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: "#f89f9f",
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }],

                    {
                        xaxis: {
                            tickLength: 0,
                            tickDecimals: 0,
                            mode: "categories",
                            min: 0,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            }
                        },
                        yaxis: {
                            ticks: 5,
                            tickDecimals: 0,
                            tickColor: "#eee",
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            }
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    });

                var previousPoint = null;
                $("#site_statistics").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' MW');
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

            }
        });

    });




    //Listeners
    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
       // Dashboard.init();
       // initChart();
        // initChartSample10();
        //  initChartSample7();
 });

    sHub.on('graph_dashboardMain', function (data) {

    })

}]);



iApp.controller('DashboardControllerMain', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {

    $scope.form = {};
    $scope.form.date = moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY');

    var sHub = $rootScope.hub;
    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        var y = _data[11];
        var disco_count = _data[14]
        $('#station_count').val(y[0].TOTAL);

        $('#disco_count').val(disco_count[0].TOTAL);
        $('#hydro_count').val(5);
        $('#thermal_count').val(73);

        App.init();
        initChartSample10();

    });
  
    var initChartSample7 = function () {
        var chart = AmCharts.makeChart("chart_7", {
            "type": "pie",
            "theme": "light",

            "fontFamily": 'Open Sans',

            "color": '#888',

            "dataProvider": [{
                "country": "Hydro",
                "value": 5
            }, {
                "country": "Thermal",
                "value": 73
            }],
            "valueField": "value",
            "titleField": "country",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "exportConfig": {
                menuItems: [{
                    icon: '/lib/3/images/export.png',
                    format: 'png'
                }]
            }
        });

        jQuery('.chart_7_chart_input').off().on('input change', function () {
            var property = jQuery(this).data('property');
            var target = chart;
            var value = Number(this.value);
            chart.startDuration = 0;

            if (property == 'innerRadius') {
                value += "%";
            }

            target[property] = value;
            chart.validateNow();
        });

        $('#chart_7').closest('.portlet').find('.fullscreen').click(function () {
            chart.invalidateSize();
        });
    }

    var initChartSample8 = function () {
        var chart = AmCharts.makeChart("chart_8", {
            "type": "pie",
            "theme": "light",

            "fontFamily": 'Open Sans',

            "color": '#888',

            "dataProvider": [{
                "country": "Disco",
                "value": 11
            }, {
                "country": "Genco",
                "value": 78
            }],
            "valueField": "value",
            "titleField": "country",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "exportConfig": {
                menuItems: [{
                    icon: '/lib/3/images/export.png',
                    format: 'png'
                }]
            }
        });

        jQuery('.chart_8_chart_input').off().on('input change', function () {
            var property = jQuery(this).data('property');
            var target = chart;
            var value = Number(this.value);
            chart.startDuration = 0;

            if (property == 'innerRadius') {
                value += "%";
            }

            target[property] = value;
            chart.validateNow();
        });

        $('#chart_8').closest('.portlet').find('.fullscreen').click(function () {
            chart.invalidateSize();
        });
    }

    var initChartSample10 = function () {

        var latlong = {};
        latlong["NG-FC"] = {
            "latitude": 10,
            "longitude": 8
        };
        latlong["NG-ED"] = {
            "latitude": 6.340477314,
            "longitude": 5.620008096
        };
        latlong["NG-EN"] = {
            "latitude": 6.867034321,
            "longitude": 7.383362995
        };
        latlong["NG-AD"] = {
            "latitude": 10.2703408,
            "longitude": 13.2700321
        };
        latlong["NG-KD"] = {
            "latitude": 11.0799813,
            "longitude": 7.710009724
        };
        latlong["NG-RI"] = {
            "latitude": 4.810002257,
            "longitude": 7.010000772
        };
        latlong["NG-KA"] = {
            "latitude": 11.99997683,
            "longitude": 8.5200378
        };
        latlong["NG-JS"] = {
            "latitude": 9.929973978,
            "longitude": 8.890041055
        };
        latlong["NG-IK"] = {
            "latitude": 6.443261653,
            "longitude": 3.391531071
        };
        latlong["NG-IB"] = {
            "latitude": 7.380026264,
            "longitude": 3.929982054
        };
        latlong["NG-EK"] = {
            "latitude": 6.45000,
            "longitude": 3.43333
        };

        var mapData = [{
            "code": "NG-FC",
            "name": "Abuja Disco Covers FCT, Kogi, Nasarawa & most parts of Niger State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-ED",
            "name": "Benin Disco Covers Edo, Ekiti, Delta and Ondo State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-EN",
            "name": "Enugu Disco Covers Abia, Anambra, Ebonyi, Enugu and Imo State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-AD",
            "name": "Yola Disco Covers Adamawa, Borno, Taraba and Yobe State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-KD",
            "name": "kaduna Disco Covers Kaduna, Kebbi, Bauchi, Sokoto and Gombe State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-RI",
            "name": "Port-Harcourt Disco Covers Rivers, Bayelsa, Cross-River,  Akwa-Ibom and Parts of Delta State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-KA",
            "name": "Kano Disco Covers Kano, Katsina and Jigawa State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-JS",
            "name": "Jos Disco Covers Plateau, Bauchi, Benue and Some Part of Gombe State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-IK",
            "name": "Ikeja Disco Covers Lagos State (Lagos Mainland, Ikeja, Surulere, Ikorodu)",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-IB",
            "name": "Ibadan Disco Covers Oyo,Osun, Ogun, Kwara State",
            "value": 162470737,
            "color": "#de4c4f"
        }, {
            "code": "NG-EK",
            "name": "Eko Disco Covers Lagos State (Victoria Island, Lekki, Lagos Island, Apapa, Epe, Ikoyi)",
            "value": 162470737,
            "color": "#de4c4f"
        }];


        var map;
        var minBulletSize = 3;
        var maxBulletSize = 100;
        var min = Infinity;
        var max = -Infinity;


        // get min and max values
        for (var i = 0; i < mapData.length; i++) {
            var value = mapData[i].value;
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }

        // build map
        AmCharts.ready(function () {
            AmCharts.theme = AmCharts.themes.dark;
            map = new AmCharts.AmMap();
            map.pathToImages = App.getGlobalPluginsPath() + "amcharts/ammap/images/",

            map.fontFamily = 'Open Sans';
            map.fontSize = '13';
            map.color = '#888';

            map.addTitle("DISCO", 14);
            //   map.addTitle("source: Gapminder", 11);
            map.areasSettings = {
                unlistedAreasColor: "#000000",
                unlistedAreasAlpha: 0.1
            };
            map.imagesSettings.balloonText = "<span style='font-size:14px;'><b>[[title]]</b></span>";

            var dataProvider = {
                mapVar: AmCharts.maps.nigeriaLow,
                images: []
            }

            // create circle for each country
            for (var i = 0; i < mapData.length; i++) {
                var dataItem = mapData[i];
                var value = dataItem.value;
                // calculate size of a bubble
                var size = (value - min) / (max - min) * (maxBulletSize - minBulletSize) + minBulletSize;
                if (size < minBulletSize) {
                    size = minBulletSize;
                }
                var id = dataItem.code;

                dataProvider.images.push({
                    type: "circle",
                    width: size,
                    height: size,
                    color: dataItem.color,
                    longitude: latlong[id].longitude,
                    latitude: latlong[id].latitude,
                    title: dataItem.name,
                    value: value
                });
            }

            map.dataProvider = dataProvider;

            map.write("chart_12");
        });

        $('#chart_12').closest('.portlet').find('.fullscreen').click(function () {
            map.invalidateSize();
        });
    }

    //$scope.change = function (item) {
    //    alert(item);
    //};

    //$scope.$watch("form.save_date", function (newVal, oldVal) {
    //    if (newVal !== oldVal) {
    //        alert('changeeeee');
    //    }
    //});
    $('#id_date').on('DOMSubtreeModified', function () {
        var date = $('#id_date').text();
       // console.log(date);
            var trimmed_val = date.split("-");
           // console.log(trimmed_val);
            if (trimmed_val.length >= 2) {
                console.log(trimmed_val[0] + ' ' + trimmed_val[1]);
                sHub.invoke('dashBoardMain_',trimmed_val[0],trimmed_val[1], function (data) {
                    var _data = JSON.parse(JSON.stringify(data));
                    console.log(_data)
                    console.log(_data[0][0].Power_Sent + ' ' + _data[1][0].Power_Sent);

                    $('#tcn_power_sent').val(_data[0][0].Total_Power_Sent);

                    $('#tcn_power_received').val(_data[1][0].TOTAL_PR);

                    $scope.total_Consumer = _data[2][0].TOTAL_UC + _data[3][0].Total_Rural_C + _data[4][0].Total_RC + _data[5][0].Total_IC;
                    $('#total_consumer').val($scope.total_Consumer);

                    $scope.Electicity_Distri = _data[6][0].Total_EDR + _data[7][0].Total_EDI;
                    $('#electricity_distri').val($scope.Electicity_Distri);


                    $('#Consumer_U').val(_data[2][0].TOTAL_UC);

                    $('#Consumer_R').val(_data[3][0].TOTAL_Rural_C);

                    $('#Consumer_Resi').val(_data[4][0].Total_RC);

                    $('#Consumer_Industrial').val(_data[5][0].Total_IC);


                    $('#Electricity_R').val(_data[6][0].Total_EDR);

                    $('#Electricity_I').val(_data[7][0].Total_EDI);



                    $('#Sales_R').val(_data[8][0].Total_SR);

                    $('#Sales_C').val(_data[9][0].Total_SC);

                    $('#Sales_I').val(_data[10][0].Total_SI);

                    $('#Sales_T').val(_data[11][0].Total_SS);


                    $('#Total_Power_G').val(_data[12][0].Total_Power_G);

                    $('#Total_Sent_Out').val(_data[13][0].Total_Sent_O);

                    $('#Total_Spinning').val(_data[14][0].Total_Spinning);

                    $('#Total_PeakHR').val(_data[15][0].Total_PeakHR);


                    $('#Totaloff_PeakHR').val(_data[16][0].Total_PeakHR);

                    $('#Cost_Operation').val(_data[17][0].Total_Cost_Operation);

                    $('#TurnOver').val(_data[18][0].Total_TurnOver);

                    // $('#Total_PeakHR').val(_data[15][0].Total_IC);

                    $('#Revenue_Energy').val(_data[19][0].Total_Revenue_E);

                    $('#Revenue_Others').val(_data[20][0].Total_Revenue_O);

                    $('#Total_Revenue').val(_data[21][0].Total_Revenue);

                    $('#OE_Fuel').val(_data[22][0].OE_Fuel);



                    $('#Revenue_Energy').val(_data[19][0].Total_Revenue_E);

                    $('#Revenue_Others').val(_data[20][0].Total_Revenue_O);

                    $('#Total_Revenue').val(_data[21][0].Total_Revenue);

                    $('#OE_Fuel').val(_data[22][0].OE_Fuel);


                    $('#OE_Purchased_Power').val(_data[23][0].OE_Purchased_Power);

                    $('#OE_Generation').val(_data[24][0].OE_Generation);

                    $('#OE_Transmission').val(_data[25][0].OE_Transmission);

                    $('#OE_Distribution').val(_data[26][0].OE_Distribution);


                    $('#OE_Consumer_Services').val(_data[27][0].OE_Consumer_Services);

                    $('#OE_Bad_Debts').val(_data[28][0].OE_Bad_Debts);

                    $('#OE_Administration').val(_data[29][0].OE_Administration);

                    $('#OE_Amortisation').val(_data[30][0].OE_Amortisation);


                    $('#OE_Depreciation').val(_data[31][0].OE_Depreciation);

                    $('#OE_Total').val(_data[32][0].OE_Total);

                    $('#Electricity_Sale').val(_data[33][0].Electricity_Sale);

                    $('#Average_Price').val(_data[34][0].Average_Price);


                    $('#Operation_Income').val(_data[35][0].Operation_Income);

                    $('#Interest_Deposit').val(_data[36][0].Interest_Deposit);

                    $('#Interest_Paid').val(_data[37][0].Interest_Paid);

                    $('#Net_Income').val(_data[38][0].Net_Income);

                    App.init();
                    initChartSample10();

                });
            }


    });

    //$(".user-location").on("input", function () {

    //    console.log("You change Span tag");

    //})


    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
       // Dashboard.init();
        initChartSample10();
        AmCharts.handleLoad();
        initChartSample7();
        initChartSample8();


    });

}]);


iApp.controller('DiscoController', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};

    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        $scope.disco_log = _data[12];
        $scope.consumer_record = _data[18];
        $scope.revenue_operations = _data[19];
        $scope.sales_revenue_log = _data[21];
    })

    $scope.save = function (data) {
        switch (data) {
            case 'Disco_Log':
                $scope.param = {
                    Name: $('#disco').val(), Code_Name: $('#codename').val(),
                    Email: $('#email').val(), Phone_Number: $('#phonenumber').val(),
                    Address: $('#address').val(), Website: $('#website').val(),
                    State_Covered: $('#statecovered').val(), State_ID: $('#stateid').val(),
                    longitude: $('#longitude').val(), latitude: $('#latitude').val(), Date_Incorporated: $('#date_corporated').val(),
                };
                sHub.invoke('postData', 'Disco_Log', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Disco Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.disco_log = _data[12];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;
            case 'Consumer_Record':
                $scope.param = {
                    Disco_Id: $('#disco_id').val(), Consumer_Ubran: $('#consumer_urban').val(), Consumer_Rural: $('#consumer_rural').val(),
                    Consumer_Residential: $('#consumer_residential').val(), Consumer_Industrial: $('#consumer_Industrial').val(),
                    E_Distribution_Residential: $('#distribution_r').val(), E_Distribution_Industrial: $('#distribution_i').val(),
                    Created_By: 1, Reporting_Date: $('#date').val() 
                };
                console.log($scope.param);
                sHub.invoke('postData', 'Consumer_Record', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Consumer Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.consumer_record = _data[18];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

            case 'sales_revenue':
                $scope.param = {
                    DISCO_ID: $('#disco_id').val(), Sales_Residential: $('#sales_r').val(), Sales_Commercial: $('#sales_c').val(),
                    Sales_Industrial: $('#sales_i').val(), Total_Sale: $('#total_s').val(), Account_Receivable_Government: $('#account_g').val(),
                    Account_Receivable_Private: $('#account_r').val(), Account_Receivable_Customer: $('#account_c').val(), Record_Date: $('#date').val(),
                    CreatedBy: 1
                };
                console.log($scope.param);
                sHub.invoke('postData', 'disco_sale_account_record', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Sale Account Operation Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.sales_revenue_log = _data[21];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

            case 'Disco_Revenue_Operations':
                $scope.total_cal();
                $scope.param = {
                    DISCO_ID: $('#disco_id').val(), Revenue_Energy: $('#R_energy').val(), Revenue_Others: $('#R_Source').val(),
                    Total_Revenue: $scope.total_revenue, OE_Fuel: $('#OE_Fuel').val(), OE_Purchased_Power: $('#OE_Power').val(),
                    OE_Generation: $('#OE_Gene').val(), OE_Transmission: $('#OE_Tran').val(), OE_Distribution: $('#OE_Distri').val(),
                    OE_Consumer_Services: $('#OE_Consumer').val(), OE_Bad_Debts: $('#OE_BadDebts').val(), OE_Administration: $('#OE_Admi').val(),
                    OE_Amortisation: $('#OE_Amort').val(), OE_Depreciation: $('#OE_Depreciation').val(), OE_Total: $scope.operational_expense,
                    Electicity_Sale: $('#elec_sale').val(), Average_Price_Kobo: $('#avg_elec').val(), Operation_Income: $('#operation_income').val(),
                    Interest_Deposit: $('#interest_depo').val(), Interest_Paid: $('#interest_paid').val(), Net_Income: $('#net_income').val(), Record_Date: $('#date').val(),
                    CreatedBy: 1
                };
                console.log($scope.param);
                sHub.invoke('postData', 'Disco_Revenue_Operations', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Reveune Operation Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.revenue_operations = _data[19];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;
        }
    };

    $scope.BindSelectedData = function (module, data) {
        $('#btn_save').addClass('hidden');
        $('#btn_update').removeClass('hidden');
        switch (module) {

            case 'Consumer_Record_edit':
                $scope.id = angular.copy(data.ID);
                $("#disco_id").get(0).selectedIndex = data.Disco_Id;
                $('#consumer_urban').val(data.Consumer_Ubran);
                $('#consumer_rural').val(data.Consumer_Rural);
                $('#consumer_residential').val(data.Consumer_Residential);
                $('#consumer_Industrial').val( data.Consumer_Industrial);
                $('#distribution_r').val(data.E_Distribution_Residential);
                $('#distribution_i').val(data.E_Distribution_Industrial);
                $("#date").val(data.Raw_Date);
                break;

            case 'Revenue_Operation_edit':
                $scope.id = angular.copy(data.ID);
                $("#disco_id").get(0).selectedIndex = data.DISCO_ID;
                $("#R_energy").val(data.Revenue_Energy);
                $('#R_Source').val(data.Revenue_Others);
                $('#OE_Fuel').val(data.OE_Fuel);
                $('#OE_Power').val(data.OE_Purchased_Power);
                $('#OE_Gene').val(data.OE_Generation);
                $('#OE_Tran').val(data.OE_Transmission);
                $('#OE_Distri').val(data.OE_Distribution);
                $('#OE_Consumer').val(data.OE_Consumer_Services);
                $('#OE_BadDebts').val(data.OE_Bad_Debts);
                $('#OE_Admi').val(data.OE_Administration);
                $('#OE_Amort').val(data.OE_Amortisation);
                $('#OE_Depreciation').val(data.OE_Depreciation);
                $('#elec_sale').val(data.Electicity_Sale);
                $('#avg_elec').val(data.Average_Price_Kobo);
                $('#operation_income').val(data.Operation_Income);
                $('#interest_depo').val(data.Interest_Deposit);
                $('#interest_paid').val(data.Interest_Paid);
                $('#net_income').val(data.Net_Income);
                $("#date").val(data.Raw_Date);
                break;
            case 'Sales_Account_edit':
                console.log(data);
                $scope.id = angular.copy(data.ID);
                $("#disco_id").get(0).selectedIndex = data.Disco_ID;
                $("#sales_r").val(data.Sales_Residential);
                $('#sales_c').val(data.Sales_Commercial);
                $('#sales_i').val(data.Sales_Industrial);
                $('#total_s').val(data.Total_Sale);
                $('#account_g').val(data.Account_Receivable_Government);
                $('#account_r').val(data.Account_Receivable_Private);
                $('#account_c').val(data.Account_Receivable_Customer);
                $("#date").val(data.Raw_Date);
                break;

        }

    };


    $scope.update = function (data) {
        switch (data) {
            case 'Disco_Log_Update':
                $scope.param = {
                    Name: $('#disco').val(), Code_Name: $('#codename').val(),
                    Email: $('#email').val(), Phone_Number: $('#phonenumber').val(),
                    Address: $('#address').val(), Website: $('#website').val(),
                    State_Covered: $('#statecovered').val(), State_ID: $('#stateid').val(),
                    longitude: $('#longitude').val(), latitude: $('#latitude').val(), Date_Incorporated: $('#date_corporated').val(),
                };
                sHub.invoke('postData', 'Disco_Log', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Disco Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.disco_log = _data[12];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;
            case 'Consumer_Record_Update':
                $scope.param = {
                    ID: $scope.id ,Disco_Id: $('#disco_id').val(), Consumer_Ubran: $('#consumer_urban').val(), Consumer_Rural: $('#consumer_rural').val(),
                    Consumer_Residential: $('#consumer_residential').val(), Consumer_Industrial: $('#consumer_Industrial').val(),
                    E_Distribution_Residential: $('#distribution_r').val(), E_Distribution_Industrial: $('#distribution_i').val(), Reporting_Date: $('#date').val()
                };
                console.log($scope.param);
                sHub.invoke('updateData', 'Consumer_Record_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Consumer Sucessfully Update', 'Operation Status');
                        $scope.ClearModel();
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.consumer_record = _data[18];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

            case 'sales_revenue_Update':
                $scope.param = {
                    ID: $scope.id,DISCO_ID: $('#disco_id').val(), Sales_Residential: $('#sales_r').val(), Sales_Commercial: $('#sales_c').val(),
                    Sales_Industrial: $('#sales_i').val(), Total_Sale: $('#total_s').val(), Account_Receivable_Government: $('#account_g').val(),
                    Account_Receivable_Private: $('#account_r').val(), Account_Receivable_Customer: $('#account_c').val(), Record_Date: $('#date').val()
                };
                console.log($scope.param);
                sHub.invoke('updateData', 'disco_sale_account_record_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Sale Account Operation Sucessfully Updated', 'Operation Status');
                        $scope.ClearModel();
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.sales_revenue_log = _data[21];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

            case 'Disco_Revenue_Operations_Update':
                $scope.total_cal();
                $scope.param = {
                    ID:$scope.id, DISCO_ID: $('#disco_id').val(), Revenue_Energy: $('#R_energy').val(), Revenue_Others: $('#R_Source').val(),
                    Total_Revenue: $scope.total_revenue, OE_Fuel: $('#OE_Fuel').val(), OE_Purchased_Power: $('#OE_Power').val(),
                    OE_Generation: $('#OE_Gene').val(), OE_Transmission: $('#OE_Tran').val(), OE_Distribution: $('#OE_Distri').val(),
                    OE_Consumer_Services: $('#OE_Consumer').val(), OE_Bad_Debts: $('#OE_BadDebts').val(), OE_Administration: $('#OE_Admi').val(),
                    OE_Amortisation: $('#OE_Amort').val(), OE_Depreciation: $('#OE_Depreciation').val(), OE_Total: $scope.operational_expense,
                    Electicity_Sale: $('#elec_sale').val(), Average_Price_Kobo: $('#avg_elec').val(), Operation_Income: $('#operation_income').val(),
                    Interest_Deposit: $('#interest_depo').val(), Interest_Paid: $('#interest_paid').val(), Net_Income: $('#net_income').val(), Record_Date: $('#date').val()
                };
                console.log($scope.param);
                sHub.invoke('updateData', 'Disco_Revenue_Operations_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Reveune Operation Sucessfully Update', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.revenue_operations = _data[19];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;
        }
    };

    $scope.delete = function (module, data) {
        switch (module) {
            case 'Disco_Log_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Disco_Log_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.disco_log = _data[12];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
            case 'Consumer_Record_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Consumer_Record_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.consumer_record = _data[18];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
            case 'Revenue_Operation_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Revenue_Operation_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.revenue_operations = _data[19];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
            case 'Sale_Revenue_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Sale_Revenue_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.sales_revenue_log = _data[21];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;


        }

    };

    $scope.ClearModel = function () {

        $(':input').not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').not('‌​:checkbox, :radio, select').val('');

        $('select[id$="id"]').each(function () {
            this.selectedIndex = 0
        });

        $('#btn_save').removeClass('hidden');

        $('#btn_update').addClass('hidden');
    };

    $scope.total_cal = function () {
        $scope.total_revenue = parseFloat($('#R_energy').val()) + parseFloat($('#R_Source').val());
        $scope.operational_expense = parseFloat($('#OE_Fuel').val()) + parseFloat($('#OE_Power').val()) + parseFloat($('#OE_Gene').val())
        parseFloat($('#OE_Tran').val()) + parseFloat($('#OE_Distri').val()) + parseFloat($('#OE_Consumer').val()) + parseFloat($('#OE_BadDebts').val()) +
        parseFloat($('#OE_Admi').val()) + parseFloat($('#OE_Amort').val()) + parseFloat($('#OE_Depreciation').val());
    }

    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
        Dashboard.init();


    });



}]);

iApp.controller('GencoController', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        $scope.genco_log = _data[13];
        $scope.genco_daily_record = _data[20]
    });


    $scope.save = function (data) {

        switch (data) {
            case 'Genco_Log':
                //$scope.param = {
                //    Name: $('#disco').val(), Code_Name: $('#codename').val(),
                //    Email: $('#email').val(), Phone_Number: $('#phonenumber').val(),
                //    Address: $('#address').val(), Website: $('#website').val(),
                //    State_Covered: $('#statecovered').val(), State_ID: $('#stateid').val(),
                //    longitude: $('#longitude').val(), latitude: $('#latitude').val(), Date_Incorporated: $('#date_corporated').val(),
                //};
                //sHub.invoke('postData', 'Disco_Log', angular.toJson($scope.param), function (data) {
                //    if (parseInt(data) === 200) {
                //        toastr.success('Disco Sucessfully Saved', 'Operation Status');
                //        $scope.form = {};
                //        sHub.invoke('dashBoardMain', function (data) {
                //            var _data = JSON.parse(JSON.stringify(data));
                //            $scope.disco_log = _data[12];
                //        });
                //    }
                //    else {
                //        toastr.error("An Error Occured while Execting the Required Operation");
                //    }
                //});
                break;
            case 'genco_daily_record':
                $scope.param = {
                    Power_ID: $('#genco_id').val(), Power_Generated: $('#power_generated').val(), Power_Sent_Out: $('#power_sent_out').val(),
                    Spinning_Reserved: $('#spin_reserved').val(), Total_PeakHR: $('#Total_peak').val(),
                    TotalOff_PeakHR: $('#Totaloff_peak').val(), Cost_Operation: $('#operation_cost').val(),
                    TurnOver: $('#turnover').val(), Record_Date: $('#date').val(), Created_By: 1,
                };
                console.log($scope.param);
                sHub.invoke('postData', 'genco_daily_record', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Consumer Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.genco_daily_record = _data[20]
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

            case 'Disco_Revenue_Operations':
                $scope.param = {
                    DISCO_ID: $('#disco_id').val(), Revenue_Energy: $('#R_energy').val(), Revenue_Others: $('#R_Source').val(),
                    Total_Revenue: $('#price_elec').val(), OE_Fuel: $('#OE_Fuel').val(), OE_Purchased_Power: $('#OE_Power').val(),
                    OE_Generation: $('#OE_Gene').val(), OE_Transmission: $('#OE_Tran').val(), OE_Distribution: $('#OE_Distri').val(),
                    OE_Consumer_Services: $('#OE_Consumer').val(), OE_Bad_Debts: $('#OE_BadDebts').val(), OE_Administration: $('#OE_Admi').val(),
                    OE_Amortisation: $('#OE_Amort').val(), OE_Depreciation: $('#OE_Depreciation').val(), OE_Total: $('#price_elec').val(),
                    Electicity_Sale: $('#price_elec').val(), Average_Price_Kobo: $('#price_elec').val(), Operation_Income: $('#price_elec').val(),
                    Interest_Deposit: $('#price_elec').val(), Interest_Paid: $('#price_elec').val(), Net_Income: $('#price_elec').val(), Record_Date: '2018-01-01',
                    CreatedBy: 1
                };
                console.log($scope.param);
                sHub.invoke('postData', 'Disco_Revenue_Operations', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Reveune Operation Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.revenue_operations = _data[19];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

        }

    };

    $scope.BindSelectedData = function (module, data) {
        $('#btn_save').addClass('hidden');
        $('#btn_update').removeClass('hidden');
        switch (module) {

            case 'genco_daily_record_edit':
                $scope.id = angular.copy(data.ID);
                $("#genco_id").get(0).selectedIndex = data.Power_ID;
                $('#power_generated').val(data.Power_Generated);
                $('#power_sent_out').val(data.Power_Sent_Out);
                $('#spin_reserved').val(data.Spinning_Reserved);
                $('#Total_peak').val(data.Total_PeakHR);
                $('#Totaloff_peak').val(data.TotalOff_PeakHR);
                $('#operation_cost').val(data.Cost_Operation);
                $('#turnover').val(data.TurnOver);
                $("#date").val(data.Raw_Date);
                break;
        }

    };


    $scope.update = function (data) {

        switch (data) {
            case 'Genco_Log':
                //$scope.param = {
                //    Name: $('#disco').val(), Code_Name: $('#codename').val(),
                //    Email: $('#email').val(), Phone_Number: $('#phonenumber').val(),
                //    Address: $('#address').val(), Website: $('#website').val(),
                //    State_Covered: $('#statecovered').val(), State_ID: $('#stateid').val(),
                //    longitude: $('#longitude').val(), latitude: $('#latitude').val(), Date_Incorporated: $('#date_corporated').val(),
                //};
                //sHub.invoke('postData', 'Disco_Log', angular.toJson($scope.param), function (data) {
                //    if (parseInt(data) === 200) {
                //        toastr.success('Disco Sucessfully Saved', 'Operation Status');
                //        $scope.form = {};
                //        sHub.invoke('dashBoardMain', function (data) {
                //            var _data = JSON.parse(JSON.stringify(data));
                //            $scope.disco_log = _data[12];
                //        });
                //    }
                //    else {
                //        toastr.error("An Error Occured while Execting the Required Operation");
                //    }
                //});
                break;
            case 'genco_daily_record_update':
                $scope.param = {
                    ID:$scope.id,Power_ID: $('#genco_id').val(), Power_Generated: $('#power_generated').val(), Power_Sent_Out: $('#power_sent_out').val(),
                    Spinning_Reserved: $('#spin_reserved').val(), Total_PeakHR: $('#Total_peak').val(),
                    TotalOff_PeakHR: $('#Totaloff_peak').val(), Cost_Operation: $('#operation_cost').val(),
                    TurnOver: $('#turnover').val(), Record_Date: $('#date').val()
                };
                console.log($scope.param);
                sHub.invoke('updateData', 'genco_daily_record_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        toastr.success('Daily Record Sucessfully Updated', 'Operation Status');
                        $scope.ClearModel();
                        $scope.form = {};
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.genco_daily_record = _data[20];
                        });
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                        console.log(data)
                    }
                });
                break;

        }

    };


    $scope.delete = function (module, data) {
        switch (module) {
            case 'Genco_Log_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Genco_Log_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.genco_log = _data[20];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
            case 'Genco_Record_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Genco_Record_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.genco_daily_record = _data[20];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
        }

    };


    $scope.ClearModel = function () {

        $(':input').not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').not('‌​:checkbox, :radio, select').val('');

        $('select[id$="id"]').each(function () {
            this.selectedIndex = 0
        });

        $('#btn_save').removeClass('hidden');

        $('#btn_update').addClass('hidden');
    };


    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
        Dashboard.init();


    });

}]);


iApp.controller('TcnController', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};

    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        $scope.disco_drp = _data[12];
        $scope.genco_log = _data[13];
        $scope.received_broadcast = _data[16];
        $scope.sent_broadcast = _data[17];
    });

    $scope.save = function (data) {
        switch (data) {
            case 'received_broadcast_btn':
                $scope.param = {
                    Genco_ID: $('#genco_id').val(), Power_Recevied: $('#power_recevied').val(),
                    Recording_Date: $('#date').val()
                };
                sHub.invoke('postData', 'Received_Broadcast', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.received_broadcast = _data[16];
                        });
                        toastr.success('Broadcast Sucessfully Saved', 'Operation Status');
                        $scope.form = {};

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;
            case 'sent_broadcast_btn':
                                $scope.param = {
                    Disco_ID: $('#disco_id').val(), Power_Sent: $('#power_sent').val(),
                    Recording_Date: $('#date').val()
                };
              //  console.log(angular.toJson($scope.param))
               // console.log(JSON.stringify($scope.param));
                sHub.invoke('postData', 'Sent_Broadcast', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.sent_broadcast = _data[17];
                        });
                        toastr.success('Broadcast Sucessfully Saved', 'Operation Status');
                        $scope.form = {};

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;

        }

    };


    $scope.BindSelectedData = function (module, data) {
        $('#btn_save').addClass('hidden');
        $('#btn_update').removeClass('hidden');
        switch (module) {
            case 'received_broadcast_edit':
                $scope.id = angular.copy(data.ID);
                $("#genco_id").get(0).selectedIndex = data.Genco_ID;
                $("#power_recevied").val(data.Power_Received);
                $("#date").val(data.Raw_Date);
                break;
            case 'sent_broadcast_edit':
             //   console.log(data);
                $scope.copy = angular.copy($scope.sent_broadcast[$scope.sent_broadcast.indexOf(data)]);
                console.log($scope.copy);
               // $scope.id = angular.copy(data.ID);
               // $scope.Disco_ID = angular.copy(data.Disco_ID);
                // console.log($scope.Disco_ID);
                $scope.id = $scope.copy.ID;
                $("#disco_id").get(0).selectedIndex = $scope.copy.Disco_ID;
                $("#power_sent").val(data.Power_Sent);
                $("#date").val(data.Raw_Date);
                break;

        }

    };

    $scope.update = function (module) {
        switch (module) {
            case 'received_broadcast_update':
                $scope.param = {
                    ID: $scope.id, Genco_ID: $('#genco_id').val(), Power_Recevied: $('#power_recevied').val(),
                    Recording_Date: $('#date').val()
                };
                sHub.invoke('updateData', 'Received_Broadcast_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.received_broadcast = _data[16];
                        });
                        toastr.success('Broadcast Sucessfully Updated', 'Operation Status');
                        $scope.ClearModel();

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;
            case 'sent_broadcast_update':
                $scope.param = {
                    ID: $scope.id,Disco_ID: $('#disco_id').val(), Power_Sent: $('#power_sent').val(),
                    Recording_Date: $('#date').val()
                };
                 console.log(angular.toJson($scope.param))
                console.log(JSON.stringify($scope.param));
                sHub.invoke('updateData', 'Sent_Broadcast_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.sent_broadcast = _data[17];
                        });
                        toastr.success('Broadcast Sucessfully Updated', 'Operation Status');
                        $scope.form = {};
                        $scope.ClearModel();

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;

        }

    };

    $scope.delete = function (module,data) {
        switch (module) {
            case 'Received_Broadcast_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Received_Broadcast_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.received_broadcast = _data[16];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
            case 'Sentout_Broadcast_Delete':
                $scope.id = angular.copy(data.ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'Sentout_Broadcast_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.sent_broadcast = _data[17];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is safe :)", "error");
                    }
                });
                break;
        

        }

    };

    $scope.ClearModel = function () {

        $(':input').not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').not('‌​:checkbox, :radio, select').val('');

        $('select[id$="id"]').each(function () {
            this.selectedIndex = 0
        });
  
        $('#btn_save').removeClass('hidden');

        $('#btn_update').addClass('hidden');
    };

    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
        Dashboard.init();


    });



}]);

iApp.controller('ManagePsmisController', ["$scope", "hubProxy", "$sHub", "$rootScope", "$window", function ($scope, hubProxy, $sHub, $rootScope, $window) {
    var sHub = $rootScope.hub;
    $scope.form = {};

    $scope.role_log = [{ ID: 1, Name: "Admin"}, { ID:2, Name: "TCN" }, {ID:3, Name: "Disco" }, {ID:4, Name: "Genco"}];
    sHub.invoke('dashBoardMain', function (data) {
        var _data = JSON.parse(JSON.stringify(data));
        $scope.users = _data[22];
    });

    $scope.save = function (data) {
        switch (data) {
            case 'system_user_btn':
                $scope.param = {
                    User_FullName: $('#fullname').val(), User_Email: $('#email').val(),
                    User_PhoneNumber: $('#phonenumber').val(), CreatedBy: 1, Role_ID: 1, Role_Name: $scope.form.role_name.Name, Company_ID: 1
                };
                sHub.invoke('postData', 'User_Log', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.users = _data[22];
                        });
                        toastr.success('User Sucessfully Saved', 'Operation Status');
                        $scope.form = {};
                        $scope.ClearModel();

                    }
                    else if (parseInt(data) === 500) {
                        toastr.error("An Account With The Email You Are Trying To Save Already Exist, Please Try Again");
                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;

        }

    };


    $scope.BindSelectedData = function (module, data) {
        $('#btn_save').addClass('hidden');
        $('#btn_update').removeClass('hidden');
        switch (module) {
            case 'received_broadcast_edit':
                $scope.id = angular.copy(data.ID);
                $("#genco_id").get(0).selectedIndex = data.Genco_ID;
                $("#power_recevied").val(data.Power_Received);
                $("#date").val(data.Raw_Date);
                break;
            case 'sent_broadcast_edit':
                //   console.log(data);
                $scope.copy = angular.copy($scope.sent_broadcast[$scope.sent_broadcast.indexOf(data)]);
                console.log($scope.copy);
                // $scope.id = angular.copy(data.ID);
                // $scope.Disco_ID = angular.copy(data.Disco_ID);
                // console.log($scope.Disco_ID);
                $scope.id = $scope.copy.ID;
                $("#disco_id").get(0).selectedIndex = $scope.copy.Disco_ID;
                $("#power_sent").val(data.Power_Sent);
                $("#date").val(data.Raw_Date);
                break;

        }

    };

    $scope.update = function (module) {
        switch (module) {
            case 'received_broadcast_update':
                $scope.param = {
                    ID: $scope.id, Genco_ID: $('#genco_id').val(), Power_Recevied: $('#power_recevied').val(),
                    Recording_Date: $('#date').val()
                };
                sHub.invoke('updateData', 'Received_Broadcast_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.received_broadcast = _data[16];
                        });
                        toastr.success('Broadcast Sucessfully Updated', 'Operation Status');
                        $scope.ClearModel();

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;
            case 'sent_broadcast_update':
                $scope.param = {
                    ID: $scope.id, Disco_ID: $('#disco_id').val(), Power_Sent: $('#power_sent').val(),
                    Recording_Date: $('#date').val()
                };
                console.log(angular.toJson($scope.param))
                console.log(JSON.stringify($scope.param));
                sHub.invoke('updateData', 'Sent_Broadcast_Update', angular.toJson($scope.param), function (data) {
                    if (parseInt(data) === 200) {
                        sHub.invoke('dashBoardMain', function (data) {
                            var _data = JSON.parse(JSON.stringify(data));
                            $scope.sent_broadcast = _data[17];
                        });
                        toastr.success('Broadcast Sucessfully Updated', 'Operation Status');
                        $scope.form = {};
                        $scope.ClearModel();

                    }
                    else {
                        toastr.error("An Error Occured while Execting the Required Operation");
                    }
                });
                break;

        }

    };

    $scope.delete = function (module, data) {
        switch (module) {
            case 'User_Delete':
                $scope.id = angular.copy(data.User_ID);
                swal({
                    title: "Are you sure?",
                    text: "You Will not be Able to Recover this Record",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        sHub.invoke('deleteData', $scope.id, 'User_Delete', function (data) {
                            console.log(data);
                            if (parseInt(data) === 500) {
                                swal("Deleted!", "Record has been deleted!", "success");
                                sHub.invoke('dashBoardMain', function (data) {
                                    var _data = JSON.parse(JSON.stringify(data));
                                    $scope.users = _data[22];
                                });
                            } else {
                                swal("Cancelled", "Server not responding", "error");
                            }
                        });
                    } else {
                        swal("Cancelled", "Record is Safe :)", "error");
                    }
                });
                break;
        }

    };

    $scope.ClearModel = function () {

        $(':input').not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').not('‌​:checkbox, :radio, select').val('');

        $('select[id$="id"]').each(function () {
            this.selectedIndex = 0
        });

        $('#btn_save').removeClass('hidden');

        $('#btn_update').addClass('hidden');
    };

    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        App.init();
        Dashboard.init();


    });



}]);





