(function () {
  'use strict';
  angular
  .module('AmadeusApp.controllers')

  .controller('TutorialController', function ($scope) {

    var self = this;
    self.activeSlide = 0;


    $scope.$on("$ionicView.enter", function (event, data) {
      // handle event

      var mySwiper = new Swiper('.swiper-container', {
        // If we need pagination
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        centeredSlides: true
      });

      // Add one more handler for this event
      mySwiper.on('slideChangeStart', function (swiper) {
        self.activeSlide = swiper.activeIndex;
      });
    });

  })
})();
