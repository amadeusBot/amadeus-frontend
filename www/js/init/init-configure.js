/**
 * Created by albertoherraiz on 10/10/16.
 */
(function (angular) {
    'use strict';

    angular
        .module('AmadeusApp')
        .config(function (
            $ionicConfigProvider) {
            if(!ionic.Platform.isIOS()){
                $ionicConfigProvider.scrolling.jsScrolling(true);
            }
        });
})(window.angular);