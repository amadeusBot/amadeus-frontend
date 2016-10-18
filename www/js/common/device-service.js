/**
 * Created by albertoherraiz on 10/10/16.
 */
(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name DBank.Initialize.DeviceService:DeviceService
     * @description
     * Service for customer operations
     * @requires $log
     */
    angular
        .module('AmadeusApp.factory')
        .service('DeviceService', function($log) {
            $log.debug("DEVICE SERVICE");

            var self = this;
            var fingerprint;
            self.isTablet = isTablet;
            self.isBrowser = isBrowser;
            self.isIPad = isIPad;
            self.isIOS = isIOS;
            self.isAndroid = isAndroid;
            self.isWindowsPhone = isWindowsPhone;
            self.setFingerprint = setFingerprint;
            self.hasFingerprint = hasFingerprint;


            function isTablet(){
                if(navigator.userAgent.match(/iPad/i)){ //For emulator
                    return true;
                }else{
                    return window.isTablet; //uk.co.workingedge.phonegap.plugin.istablet PLUGIN for real device
                }
            }

            function isBrowser(){
                return device.platform === 'browser'; //cordova-plugin-device PLUGIN
            }

            function isIPad(){
                return ionic.Platform.isIPad();
            }

            function isIOS(){
                return ionic.Platform.isIOS();
            }

            function isAndroid(){
                return ionic.Platform.isAndroid();
            }

            function isWindowsPhone(){
                return ionic.Platform.isWindowsPhone();
            }

            function setFingerprint(isFinger){
                fingerprint = isFinger;
            }

            function hasFingerprint(){
                return fingerprint;
            }

            return self;
        });


})();
