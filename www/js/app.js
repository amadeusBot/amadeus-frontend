angular.module('AmadeusApp.controllers', []);
angular.module('AmadeusApp.directives', []);
angular.module('AmadeusApp.factory', []);
angular.module('AmadeusApp', [
    'ionic',
    'AmadeusApp.controllers',
    'AmadeusApp.directives',
    'AmadeusApp.factory',
    'ngCordova',
    'ionic.closePopup'
]);
