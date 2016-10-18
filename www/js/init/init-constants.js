/**
 * Created by albertoherraiz on 10/10/16.
 */
/**
 * Created by aohi on 03/10/2016.
 */
(function (angular) {
    'use strict';

    angular
        .module('AmadeusApp')
        .constant('backendConstant', {
            url: 'https://3dc89708.ngrok.io'
        })
        .constant('iBeaconsConfig', {
            emulator: false
        });

})(window.angular);
