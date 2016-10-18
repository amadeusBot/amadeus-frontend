/**
 * Created by albertoherraiz on 10/10/16.
 */
(function () {
  'use strict';
  angular
    .module('AmadeusApp.factory')
    .factory('FigoFactory', FigoFactory);

  function FigoFactory($http, $q, backendConstant, UserFactory) {


    function createFigoUser(email, password, fullName) {

      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/rest/user';

      $http.post(reqUrl, JSON.stringify({mail: email, fullName: fullName, password: password})).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getBankList() {

      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/onboarding/bankList';

      $http.get(reqUrl).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function doLogin(email, password) {
      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/auth/login';
      $http.post(reqUrl, JSON.stringify({mail: email, password: password})).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function sendAccount(bankCode, iban, userid, pin) {
      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/rest/account';

      console.log(UserFactory.getToken());

      $http.post(reqUrl, JSON.stringify({bankCode: bankCode, iban: iban, userid: userid, pin: pin}), {
        headers: {
          'Authorization': 'Bearer ' + UserFactory.getToken()
        }
      }).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getAccounts() {

      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/rest/account';

      $http.get(reqUrl, {
        headers: {
          'Authorization': 'Bearer ' + UserFactory.getToken()
        }
      }).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getLastTransaction(accountId) {
      var deferred = $q.defer();

      var reqUrl = backendConstant.url + "/rest/transactions/" + accountId + "/last";

      $http.get(reqUrl, {
        headers: {
          'Authorization': 'Bearer ' + UserFactory.getToken()
        }
      }).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function doTransfer(params) {
      var deferred = $q.defer();

      var reqUrl = backendConstant.url + '/rest/payments';

      console.log("--------");
      console.log(params);

      $http.post(reqUrl, JSON.stringify(params), {
        headers: {
          'Authorization': 'Bearer ' + UserFactory.getToken()
        }
      }).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function checkForTransferProgress(taskId) {
      var deferred = $q.defer();

      var reqUrl = 'https://api.figo.me/task/progress?id=' + taskId;

      $http.post(reqUrl).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;

    }


    function sendResponseForChallenge(taskId, response) {
      var deferred = $q.defer();

      var reqUrl = 'https://api.figo.me/task/progress?id=' + taskId;

      $http.post(reqUrl, {response: response}).then(
        function (data) {
          deferred.resolve(data.data);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;

    }


    return {
      createFigoUser: createFigoUser,
      getBankList: getBankList,
      doLogin: doLogin,
      sendAccount: sendAccount,
      getAccounts: getAccounts,
      getLastTransaction: getLastTransaction,
      doTransfer: doTransfer,
      checkForTransferProgress: checkForTransferProgress,
      sendResponseForChallenge: sendResponseForChallenge
    }

  }




})();

