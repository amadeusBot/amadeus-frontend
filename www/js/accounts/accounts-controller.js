(function () {
  'use strict';
  angular
  .module('AmadeusApp.controllers')

  .controller('AccountsController', function ($scope, $ionicPopover, $ionicSlideBoxDelegate, UserFactory) {

    var self = this;

    self.userAccounts = UserFactory.getUserAccounts();
    console.log(self.userAccounts);

    $ionicPopover.fromTemplateUrl('templates/account-popover.html', {
      scope: $scope,
    }).then(function(popover) {
      self.popover = popover;
    });

    self.openPopover = function($event) {
      self.popover.show($event);
    };

    self.closePopover = function() {
      self.popover.hide();
    };

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();

    if (isIOS){
      document.body.classList.add('platform-ios');
      document.body.classList.remove('platform-android');
    }else if (isAndroid){
      document.body.classList.remove('platform-ios');
      document.body.classList.add('platform-android');
    }

  })
})();
