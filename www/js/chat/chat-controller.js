/**
 * Created by albertoherraiz on 10/10/16.
 */
(function () {
    'use strict';
    angular
        .module('AmadeusApp.controllers')
        .controller('ChatCtrl',ChatCtrl);

    function ChatCtrl($scope, $timeout, $ionicScrollDelegate, $ionicPopup, IonicClosePopupService,
                      ChatFactory, UserFactory, $ionicModal, $rootScope, $ionicSlideBoxDelegate, FigoFactory, $ionicLoading) {

        var self = this;

      var transferContext = {
        accountId: "",
        iban: "",
        amount: "",
        name: "",
        purpose: "My first test",
        type: "Transfer"
      };

        //Var Definitons
        self.response = {};
        self.messages = [];
        self.activeIndex = 0;
        self.msg = "";
        self.expand=false;
        self.optionsSlider = {
            loop: false,
            speed: 500,
            pagination: false,
            noSwiping:true
        };
        self.isRecording = false;
        self.messageIntercepted = false;
        self.voiceMsg = "";
        self.userInfo = UserFactory.getUserData();
        self.userAccounts = UserFactory.getUserAccounts();

        self.messages.push({from: 'bot', text: 'Hello ' + self.userInfo.name + ', my name is Amadeus! What can I do for you?'});

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

        $rootScope.$on('detectedBeacon', function () {
            detectedBeacon();
        });

        function detectedBeacon(){
            printResponse({fulfillment:{speech:null}},'beacon');
        }

        self.disableSwipe = function(){
            $ionicSlideBoxDelegate.enableSlide(false);
        };


        //Method Definitions
        self.sendMessage = sendMessage;
        self.switchRecognition = switchRecognition;
        self.inputUp = inputUp;
        self.inputDown = inputDown;
        self.closeKeyboard = closeKeyboard;
        self.record = record;
        self.showRoute = showRoute;
        self.reproduceMessage = reproduceMessage;
        self.changeSlide = changeSlide;
        self.showRecordPopup = showRecordPopup;
        self.recordVoice = recordVoice;
        self.trash = trash;
        self.seeMore = seeMore;
        self.closeSeeMore = closeSeeMore;
        self.chooseBankAccount = chooseBankAccount;
        self.chooseContact = chooseContact;
        self.closeContact = closeContact;
        self.showContacts = showContacts;

        var recognition;
        var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isWebView() && ionic.Platform.isAndroid();
        var isBrowser = false; //cordova-plugin-device





        /*GPSService.getCurrentLocation().then(function(data){
         self.position = data;
         },function(error){
         console.log("Error");
         });*/

        function startRecognition() {
            recognition = new webkitSpeechRecognition();
            /*recognition.onstart = function(event) {
             updateRec();
             };*/
            recognition.onresult = function (event) {
                var text = "";
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    text += event.results[i][0].transcript;
                }
                self.voiceMsg = text;
                console.log(self.voiceMsg);
                self.messageIntercepted = true;
                self.isRecording = false;
                $scope.$apply();
                stopRecognition();
            };
            recognition.onend = function () {
                stopRecognition();
            };
            recognition.lang = "en-US";
            recognition.start();
        }

        function stopRecognition() {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
            //updateRec();
        }

        function switchRecognition() {
            if (recognition) {
                stopRecognition();
            } else {
                startRecognition();
            }
        }



        function record() {
            self.isRecording = true;
            if (!isBrowser) {
                var recognition = new SpeechRecognition();
                recognition.onresult = function (event) {
                    if (event.results.length > 0) {
                        self.voiceMsg = event.results[0][0].transcript;
                        self.isRecording = false;
                        self.messageIntercepted = true;
                        $scope.$apply();
                    }
                };
                recognition.start();
            } else { //Browser
                switchRecognition();
            }

        };

        if (navigator.userAgent.match(/iPad/i)) { //For emulator
            self.isTablet = true;
            if (window.innerHeight > window.innerWidth) {
                self.isPortrait = true;
            }
        } else {
            self.isTablet = window.isTablet; //uk.co.workingedge.phonegap.plugin.istablet PLUGIN for real device
            if (window.innerHeight > window.innerWidth) {
                self.isPortrait = true;
            }
        }

        function resetRecordValues(){
            $scope.$evalAsync(function () {
                self.msg = "";
                self.isRecording = false;
                self.voiceMsg = "";
                self.messageIntercepted = false;
            });
        }

        function sendMessage() {
            console.log(self.msg);
            if(self.voiceMsg !== ""){
                self.msg = self.voiceMsg;
                self.confirmPopup.close();
            }
            self.messages.push({from: 'me', text: self.msg});
            var messageToSend = self.msg;
            self.msg = "";
            $ionicScrollDelegate.scrollBottom(true);
            ChatFactory.sendMessage(messageToSend).then(function (data) {
                setResponse(data);
            },function (error) {
                console.log("Error sending message " + error);
            });

        }


        function setResponse(val) {

            resetRecordValues();
            console.log("SUCCESS:" + val);


            $scope.$evalAsync(function () {
                var response = val.result;
                if (response.action) {
                    switch (response.action) {
                        case 'nearOffices':
                            getNearOffices(response);
                            break;
                        case 'showContacts':
                            getContacts(response);
                            break;
                        case 'getExchange':
                            getExchange(response);
                            break;
                        case 'requestInformation':
                            getReqInformation(response);
                            break;

                        case 'getAccounts':
                            getBankAccounts(response);
                            break;
                        case 'startTransfer':
                            startTransfer(response);
                            break;
                        default:
                            printResponse(response, 'noAction');
                            break;
                    }
                } else {
                    printResponse(response, 'noAction');
                }

            });
        }

        function startTransfer(response) {
          /*if(!transferContext.accountId || !transferContext.destAccount || !transferContext.amount) {
            printResponse({fulfillment:{speech:"I'm a bit confused."}});
            return;
          }
*/

          printResponse({fulfillment:{speech:"Receiving your PHOTOTAN "}});
          transferContext.amount = parseInt(response.parameters.money);

          FigoFactory.doTransfer(transferContext).then(
            function(response) {
              console.log("TRANSFER SUCCESS");
              $timeout(function() {
              startIntervalToCheckTransferTask(response.task_token);
              }, 500);
            },
            function (error) {
              console.log("TRANSFER ERROR");
              console.log(error);
            }
          );


        }

      var taskInterval;
      function startIntervalToCheckTransferTask(taskToken) {
        $ionicLoading.show();
        taskInterval = setInterval(function () {
          FigoFactory.checkForTransferProgress(taskToken).then(
            function (data) {
              console.log("SUCCESS");
              console.log(data);
              if (data.is_waiting_for_response) {
                clearInterval(taskInterval);
                $ionicLoading.hide();
                showCoordinatePopup(data.challenge, taskToken);
              } else if (data.is_ended) {
                clearInterval(taskInterval);
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Transfer success',
                  template: 'Your transfer has been completed successfully'
                });
                updateAccounts();
              }
            },
            function (error) {
              console.log("EEERRRORRR");
              console.log(error);
            }
          )
        }, 1000);
      }


      function updateAccounts() {
        self.userAccounts.forEach(function(account) {
          if(account.account_id === transferContext.accountId) {

            account.balance.balance = account.balance.balance - transferContext.amount;

            var lastTransaction = {
              "value_date": new Date(),
              "bank_name": "Demobank",
              "account_id": "A1776909.1",
              "bank_code": "90090042",
              "currency": "EUR",
              "purpose": "Ihre Bestellung Vom 01.03. / Re-Nr. 9123093129013290",
              "transaction_code": 4,
              "booked": true,
              "booking_date": "2016-10-10T00:00:00.000Z",
              "name": "Fidibus Holzspan Gmbh & Co. Kg",
              "creation_timestamp": "2016-10-11T03:05:44.000Z",
              "amount": parseInt(transferContext.amount) * -1,
              "account_number": "4711951501",
              "visited": true,
              "modification_timestamp": "2016-10-11T03:05:44.000Z",
              "type": "Transfer",
              "transaction_id": "T1776909.2",
              "booking_text": "Lastschrift"
            };

            account.lastTransaction = lastTransaction;
          }
        });
        UserFactory.setUserAccount(self.userAccounts);
      }


      function showCoordinatePopup(challenge, transferTaskId) {
        $scope.data = {};

        var myPopup = $ionicPopup.show({
          template: '<input type="number" ng-model="data.coordinateNumber">',
          title: 'Enter your bank coordinate code ' + challenge.label,
          scope: $scope,
          cssClass: 'coordinateCodePopup',
          buttons: [
            {
              text: 'Cancel transfer',
              type: 'button-calm button-clear'
            },
            {
              text: '<b>Confirm</b>',
              type: 'button-calm',
              onTap: function (e) {
                if (!$scope.data.coordinateNumber) {
                  e.preventDefault();
                } else {
                  return $scope.data.coordinateNumber;
                }
              }
            }
          ]
        });

        myPopup.then(function (res) {
          if (res) {
            FigoFactory.sendResponseForChallenge(transferTaskId, res).then(
              function (data) {
                console.log("sendResponseForChallenge");
                console.log(data);
                startIntervalToCheckTransferTask(transferTaskId);
              },
              function (error) {
                console.log("ERRROR");
                console.log(error)
              })
          }
        });

        $timeout(function() {
          $scope.data.coordinateNumber = 111111;
        }, 3000)
      }

        function getReqInformation(response){
            printResponse({fulfillment:{speech:null}}, 'reqInfo');
        }

        function getNearOffices(response) {
            var offices = response.fulfillment.data.result;
            response.data = offices;
            printResponse(response, 'office');
        }

        function getContacts(response) {

        }

        function getBankAccounts(response){
            response.fulfillment.speech = "Sure, from which account?";
            printResponse(response,response.action);
        }

        function chooseBankAccount(bankAccount){
          transferContext.accountId = bankAccount.account_id;
            printResponse({fulfillment:{speech:"To whom do you want to send?"}}, 'chooseContacts');
        }

        function chooseContact(contact){
          console.log(contact);
          transferContext.name = contact;
          self.userAccounts.forEach(function(account) {
            if(account.iban) {
              if(account.account_id !== transferContext.accountId){
                transferContext.iban = account.iban;
              }
            }
          });

          //SELECCIONAR CUENTA LIBRE
          printResponse({fulfillment:{speech:"Perfect! How much money do you want to send to "
                + contact + "?"}});
        }

        function getExchange(response){ // Currency exchange rate euro to dollar
            var data = response.fulfillment.data;
            response.data={source:data.result.source,currencies:data.result.quotes};
            printResponse(response,data.type);
        }

        function printResponse(response, action) {
            self.messages.push({from: 'bot', isFake:true});
            $ionicScrollDelegate.$getByHandle('chat').scrollBottom(true);
            $timeout(function(){
                self.messages.pop();
                if (action !== 'noAction') {
                    self.messages.push({from: 'bot', text: response.fulfillment.speech, data: response.data, type: action});
                } else {
                    self.messages.push({from: 'bot', text: response.fulfillment.speech});
                }
                $ionicScrollDelegate.$getByHandle('chat').scrollBottom(true);
            },1500);

        }

        function inputUp() {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function () {
              $ionicScrollDelegate.$getByHandle('chat').scrollBottom(true);
            }, 300);

        };

        function inputDown() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
            $timeout(function () {
              $ionicScrollDelegate.$getByHandle('chat').scrollBottom(true);
            });
        };

        function closeKeyboard() {
            //cordova.plugins.Keyboard.close();
        };

        function showRoute(latitude, longitude) {
            if(isBrowser){
                window.open('https://www.google.es/maps/dir/41.491488,2.0732503/' + latitude + "," + longitude, '_system');
                return
            }

            $cordovaInAppBrowser.open('https://www.google.es/maps/dir/41.491488,2.0732503/' + latitude + "," + longitude, '_system', {}).then(function (event) {
                // success
            }).catch(function (event) {
                // error
            });
        }

        function reproduceMessage(msg) {
            //https://responsivevoice.org/api/
            if (responsiveVoice.voiceSupport())
                responsiveVoice.speak(msg);
            else {
                alert("Your device not support native text to speech")
            }
        }

        function changeSlide(index){
            self.activeIndex = index;
            $scope.slider.update(false);
            $scope.slider.slideTo(index, 0, false);
        }



        function showRecordPopup(){
            $scope.$broadcast('timer-start');
            self.confirmPopup  = $ionicPopup.confirm({
                title: '',
                templateUrl: 'templates/record.html',
                cssClass:'recordPopup animated slideInUp',
                scope: $scope,
                buttons:[]
            });

            IonicClosePopupService.register(self.confirmPopup);

            recordVoice();
            $timeout(function(){
                var SW = new SiriWave({
                    width: 259,
                    height: 70,
                    speed: 0.12,
                    amplitude: 1,
                    color:'#01a1b5',
                    container: document.getElementById('soundwave'),
                    autostart: true
                });
            },100);


            self.confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                    if(recognition){recognition.stop();}
                    resetRecordValues();
                }
            });

        }

        function recordVoice(){
            self.isRecording = !self.isRecording;
            if(!self.isRecording){
                if(recognition){
                    recognition.stop();
                }
            }
            else{
                record();
            }

        }

        function trash(){
            self.messageIntercepted = false;
            $timeout(function(){
                var SW = new SiriWave({
                    width: 259,
                    height: 70,
                    speed: 0.12,
                    amplitude: 1,
                    color:'#01a1b5',
                    container: document.getElementById('soundwave'),
                    autostart: true
                });
            },100);
            record();
        }

        function seeMore(){
            $ionicModal.fromTemplateUrl('templates/external-advise-content.html',{
                scope: $scope
            }).then(
                function(modal){
                self.adviseModal = modal;
                self.adviseModal.show();
            });
        }

        function showContacts(){
            $ionicModal.fromTemplateUrl('templates/chooseContact.html',{
                scope: $scope
            }).then(
            function(modal){
                self.closeModal = modal;
                self.closeModal.show();
            });
        }

        function closeSeeMore(){
            self.adviseModal.hide();
        }

        function closeContact(fullName){
            if(!fullName) {
                self.closeModal.hide();
            }else{
                chooseContact(fullName);
                self.closeModal.hide();
            }
        }

    }
})();

