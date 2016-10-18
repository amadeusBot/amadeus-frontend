/**
 * Created by albertoherraiz on 10/10/16.
 */
(function () {
    'use strict';
    angular
        .module('AmadeusApp.controllers')

        .controller('MenuCtrl', function ($scope, UserFactory, $cordovaGeolocation, $cordovaBeacon, iBeaconsService) {

            var self = this;

            /*Variables Definitions*/
            self.activeItem = "Amadeus";
            self.activeIndex = 0;
            self.optionsSlider = {
                loop: false,
                speed: 500,
                pagination: false
            };
            self.userInfo = UserFactory.getUserData();

            /*Method Definitions*/
            self.changeSlide = changeSlide;
            self.showInfo = showInfo;

            $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
                // data.slider is the instance of Swiper
                $scope.slider = data.slider;
            });

            $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
                // note: the indexes are 0-based
                self.activeIndex = data.slider.activeIndex;
                $scope.$apply();
                $scope.previousIndex = data.slider.previousIndex;
            });

            function changeSlide(index){
                self.activeIndex = index;
                $scope.slider.update(false);
                $scope.slider.slideTo(index, 0, false);
            }

            function showInfo(){
                $cordovaBeacon.requestAlwaysAuthorization().then(function(){
                    iBeaconsService.searchBeacons();
                });
            }
        })
})();

