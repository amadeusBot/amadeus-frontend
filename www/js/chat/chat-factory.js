/**
 * Created by albertoherraiz on 10/10/16.
 */
/**
 * Created by albertoherraiz on 10/10/16.
 */
(function () {
    'use strict';
    angular
        .module('AmadeusApp.factory')
        .factory('ChatFactory',ChatFactory);

        function ChatFactory ($http, $q) {


            function sendMessage(messageToSend) {
                var versioning = "v=20150910";
                var baseUrl = "https://api.api.ai/v1/";
                var accessToken = "f5bab9d31e4d4142b5985edfad218023";
                var deferred = $q.defer();

                var config = {
                    headers: {
                        "Authorization": "Bearer " + accessToken,
                        "Content-Type": "application/json; charset=utf-8"
                    }
                };

                var reqUrl = baseUrl + "query?" + versioning;

                $http.post(reqUrl, JSON.stringify({ q: messageToSend, lang: "en" }), config).then(
                    function(data) {
                        deferred.resolve(data.data);
                    },
                    function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            return{
                sendMessage: sendMessage
            }

        }




})();

