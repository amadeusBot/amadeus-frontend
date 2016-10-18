(function () {
  'use strict';

  angular
    .module('AmadeusApp')
.run(function($ionicPlatform, iBeaconsService, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    iBeaconsService.checkBluetooth();
    $cordovaGeolocation.getCurrentPosition().then(function(){
      console.log("Get location ");
    });

  });
});
})(window.angular);
