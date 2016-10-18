(function () {
  'use strict';
  angular
    .module('AmadeusApp.controllers')

    .controller('SignUpController', function ($ionicPopup, $state, $rootScope, $cordovaLocalNotification,
                                              FigoFactory, UserFactory, DeviceService, $ionicModal,
                                              $scope, $ionicLoading, $timeout) {

      var self = this;
      var code = "";
      var notificationCode = "";


      self.userPhoneNumber = '';
      self.validPhoneNumber = false;
      self.steps = {
        addPhone: true,
        verifyPhone: false
      };

      self.email = "";
      self.password = "";
      self.fullName = "";


      self.nextStep = nextStep;
      self.checkPhoneNumber = checkPhoneNumber;
      self.createFigoUser = createFigoUser;
      self.showAllBankAccounts = showAllBankAccounts;
      self.addNewAccount = addNewAccount;
      self.closeModal = closeModal;
      self.checkFingerPrint = checkFingerPrint;
      self.generateLocalNotification = generateLocalNotification;
      self.getUserAccounts = getUserAccounts;


      function createFigoUser() {
        FigoFactory.createFigoUser(self.email, self.password, self.fullName).then(function (userData) {
          FigoFactory.doLogin(self.email, self.password).then(function (loginData) {
            console.log(loginData);
            UserFactory.setToken(loginData.access_token);
            UserFactory.setUserData(self.email, self.password, self.fullName);
          });

          FigoFactory.getBankList().then(function (data) {
            UserFactory.saveBankAccounts(data.banks);
            self.bankList = data.banks;
          });

        });
        $state.go('signup.phoneVerification');
      }


      function verifyPhoneNumber() {

        if (!self.validPhoneNumber) {
          return;
        }

        var confirmPopup = $ionicPopup.confirm({
          title: 'Verify phone',
          template: 'We will send you a verification code to ' + self.userPhoneNumber,
          okType: 'button-calm', // String (default: 'button-positive'). The type of the OK button.
          cancelType: 'button-calm button-clear',
          cancelText: "EDIT"
        });

        confirmPopup.then(function (res) {
          if (res) {
            self.steps = {
              addPhone: false,
              verifyPhone: true
            };

            generateLocalNotification();
          }
        });
      }

      function generateLocalNotification() {
        code = Math.floor(Math.random() * 900000) + 100000;

        $cordovaLocalNotification.schedule({
          id: 6286,
          title: "AmadeusBot",
          text: "Your verification code for AmadeusBot is " + code,
          at: new Date(new Date().getTime() + 3 * 1000),
          data: {
            verificationCode: code
          }
        }).then(function (result) {
        });
      }

      function checkVerificationCode() {
        console.log("checkVerificationCode");
        //if(notificationCode === code) {
        $state.go('signup.accountsSelection');
        //}
      }

      function nextStep() {
        if (self.steps.addPhone) {
          verifyPhoneNumber();
        }
        else {
          checkVerificationCode();
        }
      }

      function checkPhoneNumber() {
        self.validPhoneNumber = String(self.userPhoneNumber).length >= 11;
      }


      function showAllBankAccounts() {

        //Prepare modal;
        $ionicModal.fromTemplateUrl('templates/signUp/banksModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          self.accountsModal = modal;
          self.accountsModal.show();
        });
      }

      function closeModal() {
        self.accountsModal.hide();
      }

      self.userAccounts = [];
      $scope.account = {};
      function addNewAccount(selectedBank) {
        if (!selectedBank.checked) return;

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/signUp/accountDetailsPopup.html',
          title: 'Account details',
          cssClass: 'accountDetailsPopup',
          scope: $scope,
          buttons: [
            {
              text: 'CANCEL',
              type: 'button-calm button-clear',
              onTap: function (e) {
                selectedBank.checked = false;
              }
            },
            {
              text: '<b>OK</b>',
              type: 'button-calm',
              onTap: function (e) {
                console.log($scope.account);
                if (!$scope.account.accountNumber || !$scope.account.pin) {
                  e.preventDefault();
                } else {
                  return $scope.account;
                }
              }
            }
          ]
        });

        myPopup.then(function (res) {
          console.log(res);
          if (!res) return;

          var accountToSave = {
            bank: selectedBank,
            accountInfo: res
          };
          $scope.account = {};
          saveAccount(accountToSave);

          closeModal();
        });

        $timeout(function() {
          $scope.account.accountNumber = "DE67900900424711951500";
        }, 2000);
      }


      function saveAccount(accountToSave) {
        $ionicLoading.show();

        var bankCode = accountToSave.bank.bank_code;
        var iban = accountToSave.accountInfo.accountNumber;
        var userid = accountToSave.accountInfo.userId;
        var pin = accountToSave.accountInfo.pin;

        FigoFactory.sendAccount(bankCode, iban, userid, pin).then(
          function (data) {
            console.log(data);
            self.userAccounts.push(accountToSave);
          },
          function (error) {
            console.log(error);
          }
        ).finally(function() {
          $ionicLoading.hide();
        })
      }

      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          notificationCode = (JSON.parse(notification.data)).verificationCode;
          var digits = ("" + notificationCode).split("");

        });

      function checkFingerPrint() {
        if (DeviceService.isAndroid()) {
          FingerprintAuth.isAvailable(function (result) {
            /**
             * @return { isAvailable:boolean, isHardwareDetected:boolean, hasEnrolledFingerprints:boolean }
             */
            console.log("FingerprintAuth available: " + JSON.stringify(result));
            if (result.isAvailable) {
              DeviceService.setFingerprint(true);
              FingerprintAuth.show({
                clientId: "Banking Online",
                clientSecret: "a_very_secret_encryption_key"
              }, successCallback, errorCallback);
              /**
               * @return {withFingerprint:base64EncodedString, withPassword:boolean}
               */
              function successCallback(result) {
                console.log("successCallback(): " + JSON.stringify(result));
                if (result.withFingerprint) {
                  console.log("Successfully authenticated using a fingerprint");
                  //touchIDServiceCallback.sendTouchIdSuccessCallback(0); //Use 0 to Success
                  $state.go('signup.voice-verification')
                } else if (result.withPassword) {
                  console.log("Authenticated with backup password");
                  //touchIDServiceCallback.sendTouchIdSuccessCallback(0); //Use 0 to Success
                }
              }

              function errorCallback(error) {
                console.log(error); // "Fingerprint authentication not available"
              }

            }
          }, function (message) {
            console.log("isAvailableError(): " + message);
          });
        }
      }


      function getUserAccounts() {
          FigoFactory.getAccounts().then(
          function(data) {
            console.log(data);

            data.accounts.forEach(function(account) {
              FigoFactory.getLastTransaction(account.account_id).then(
                function(response) {
                  console.log(response);
                  account.lastTransaction = response;
                  UserFactory.setUserAccount(account);
                }, function(error) {
                  console.log("ERROR GETTING LAST TRANSACTION");
                }
              )
            })
          },
          function(error) {
            console.log("......");
            console.log(error)
          }
        )
      }



      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          notificationCode = (JSON.parse(notification.data)).verificationCode;
          var digits = ("" + notificationCode).split("");

          self.verificationCode1 = parseInt(digits[0]);
          self.verificationCode2 = parseInt(digits[1]);
          self.verificationCode3 = parseInt(digits[2]);
          self.verificationCode4 = parseInt(digits[3]);
          self.verificationCode5 = parseInt(digits[4]);
          self.verificationCode6 = parseInt(digits[5]);

          setTimeout(function () {
            $cordovaLocalNotification.clear('6286');
            checkVerificationCode();
          }, 1000)
        });

    })
})();
