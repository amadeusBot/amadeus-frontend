/**
 * Created by albertoherraiz on 11/10/16.
 */
/**
 * Created by aohi on 03/10/2016.
 */
(function (angular) {
    'use strict';


    angular
        .module('AmadeusApp.factory')
        .service('ionicUtils', ionicUtils);

    /**
     * @ngdoc service
     * @name DBank.Initialize.ionicUtils:ionicUtils
     * @description
     * This service includes different popups or modals for use to dashboard controller
     * @param {Object} $ionicPopup ionic PopUp
     * @param {Object} $ionicModal ionic Modal
     */
    function ionicUtils($ionicPopup, $ionicModal ) {

        return {
            showPopUpGeneric: showPopUpGeneric,
            showPopUpConfirm: showPopUpConfirm,
            showModal: showModal
        };

        //Show Generic Popup Alert
        function showPopUpGeneric(text, varclass) {
            var promise;
            var popupParams = {};
            if(varclass) {
                popupParams.cssClass = varclass;
            }
            if(text.buttons) {
                popupParams.buttons = text.buttons;
            }
            if(text.title) {
                popupParams.title = text.title;
            }
            if(text.template) {
                popupParams.template = text.template;
            }
            promise = $ionicPopup.alert(popupParams);
            return promise;
        }

        function showPopUpConfirm(text, varclass) {
            var promise;
            var popupParams = {};
            if(varclass) {
                popupParams.cssClass = varclass;
            }
            if(text.buttons) {
                popupParams.buttons = text.buttons;
            }
            if(text.title) {
                popupParams.title = text.title;
            }
            if(text.template) {
                popupParams.template = text.template;
            }
            promise = $ionicPopup.confirm(popupParams);
            return promise;
        }

        // Show Modal Box
        function showModal(template, $scope) {
            var promise;
            promise = $ionicModal.fromTemplateUrl(template, {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose: true
            });
            return promise;
        }
    }

})(window.angular);
