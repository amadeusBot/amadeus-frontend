'use strict';
angular.module('AmadeusApp')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'templates/tutorial.html',
      controller: 'TutorialController',
      controllerAs: 'tutorialCtrl'
    })

    .state('signup', {
      url: '/signup',
      abstract: true,
      template: '<ion-nav-view></ion-nav-view>',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl'
    })

    .state('signup.starter', {
      url: '/starter',
      templateUrl: 'templates/signUp/signup-starter.html'
    })

    .state('signup.phoneVerification', {
      url: '/phoneVerification',
      templateUrl: 'templates/signUp/phone-verification.html'
    })

    .state('signup.accountsSelection', {
      url: '/accountsSelection',
      templateUrl: 'templates/signUp/accounts-selection.html'
    })

    .state('signup.fingerprint', {
      url: '/fingerprint',
      templateUrl: 'templates/signUp/fingerprint.html'
    })

    .state('signup.voice-verification', {
      url: '/voiceVerification',
      templateUrl: 'templates/signUp/voice-verification.html'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl as menu'
    })

    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl as dash'
        }
      }
    })

    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html'
        }
      }
    })
    .state('app.accounts', {
      url: '/accounts',
      views: {
        'menuContent': {
          templateUrl: 'templates/accounts.html',
          controller: 'AccountsController',
          controllerAs: 'accountCtrl'
        }
      }
    })

    .state('app.accounts-slider', {
      url: '/accounts-slider',
      views: {
        'menuContent': {
          templateUrl: 'templates/accounts-chat-slider.html',
          controller: 'AccountsController',
          controllerAs: 'accountCtrl'
        }
      }
    })

    .state('app.external-advise', {
      url: '/external-advise',
      views: {
        'menuContent': {
          templateUrl: 'templates/external-advise.html',
          controller: 'ChatCtrl as dash'
        }
      }
    })

    .state('app.educational-spot', {
      url: '/educational-spot',
      views: {
        'menuContent': {
          templateUrl: 'templates/educational-spot.html'
         }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })

    .state('app.logout', {
      url: '/logout/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/logout.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tutorial');
});
