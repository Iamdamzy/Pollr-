iApp.factory('SharedData', ['$http', '$rootScope', function ($http, $rootScope) {
    var requestReturn = {};

    requestReturn.result = function (p) {
        // Rest of code
    },

    requestReturn.crawlWeb = function () {
        alert("service Called");
    }
    return requestReturn;

}]);

iApp.factory("hubProxy", ["$rootScope", "serverUrl", "$log", function ($rootScope, serverUrl, $log) {
    function hubProxyFactory(serverUrla, hubName) {
        var connection = $.hubConnection(serverUrl);
        connection.logging = false;
        var proxy = connection.createHubProxy(hubName);
        function proxie(callback, args) {
            proxy.invoke.apply(proxy, args)
                .done(function (result) {
                    if (callback) {
                        $rootScope.$apply(function () {
                            callback(result);
                        });
                    }
                });
        }
        return {
            init: function () {
                //$rootScope.$apply(function () {
                //    self.on('onConnected', function (data) {
                //        console.log('connected')
                //    });
                //});
            },
            start: function (startOptions) {
                return connection.start(startOptions)
            },
            stop: function () {
                connection.stop();
                proxy = null;
            },
            on: function (eventName, callback) {
                proxy.on(eventName, function (data) {
                    var len = arguments.length;
                    var args = Array.prototype.slice.call(arguments);
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(null, args);
                        }
                    });
                });
            },
            onb: function (eventName) {
                proxy.on(eventName, function (data) {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast(eventName, data);
                    });
                });
            },
            off: function (eventName) {
                proxy.off(eventName);
            },
            invoke: function () {
                var len = arguments.length;
                var args = Array.prototype.slice.call(arguments);
                var callback = undefined;

                if (len > 1) {
                    callback = args.pop();
                }
                if (connection._subscribeToHub == undefined) {
                    this.connection.start().done(function () {
                        proxie(callback, args)
                    }).fail(function (error) {
                        $log.error('there is an errorrrrrrr' + error);
                    });
                } else { proxie(callback, args) }
            },
            connection: connection,
            onError: function (callback) { connection.error(callback()) },
            onReconnecting: function (callback) { connection.error(callback) },
            onConnectionSlow: function (callback) { connection.connectionSlow(callback) },
        };
    };
    //console.log('hubProxy factory', serverUrl)//excutes first in the heirachy tree
    //hubProxy.on()
    return hubProxyFactory;
}]);
