(function () {
  'use strict';
  angular
    .module('AmadeusApp.factory')
    .factory('UserFactory', UserFactory);

  function UserFactory() {

    var bankAccounts;
    var figoToken;
    var userData = {};
    var userAccounts = [];

    function saveBankAccounts(bdBankAccounts) {
      bankAccounts = bdBankAccounts;
    }

    function getBankAccounts() {
      return bankAccounts;
    }

    function setToken(token) {
      figoToken = token;
    }

    function getToken() {
      return figoToken;
      //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAZ2Z0LmNvbSIsInRva2VuIjoiQXEzQnNzLWxWN2Z3Nk41NjU1V0tEcnIyUEIzSFA4V2NZcTc5dkgzRVozZ0pwWW9xY0ZqdThmbFV3U25LaE5HbkJJdHJaS1ZTdmhzeWJZaENYV2Zhb3NPVWJrVzlQMGVqZEJVOGtYSWdoV0VzIiwic3ViIjoiYmFiZDhhNmQxNGI1OWRlZjEwNzdkMDc1MDlkN2JhYTgiLCJpYXQiOjE0NzYxNzU2NTIsImV4cCI6MTQ3NjI2MjA1Mn0.1cETYRo1LCHJbRCGOAS4R9eIeAd8C9VGE5pFF5G57uE";
    }

    function getUserData() {
      return userData;
    }

    function setUserData(email, password, fullName) {
      userData = {email: email, password: password, name: fullName};
    }

    function setUserAccount(account) {
      userAccounts.push(account);
    }

    function getUserAccounts() {
      return userAccounts;
      //return JSON.parse('[{"status":{"sync_timestamp":"2016-10-11T03:05:46.000Z","code":1,"success_timestamp":"2016-10-11T03:05:46.000Z"},"bank_name":"Demobank","balance":{"balance_date":"2016-10-11T00:00:00.000Z","balance":3250.31,"monthly_spending_limit":0,"credit_line":0},"account_id":"A1776909.1","bank_code":"90090042","auto_sync":true,"save_pin":true,"bank_id":"B1776909.1","supported_payments":{"Transfer":{"supported_text_keys":[51,53],"max_purpose_length":108,"allowed_recipients":[],"can_be_recurring":false,"supported_file_formats":[],"can_be_scheduled":false},"SEPA transfer":{"supported_text_keys":[51],"max_purpose_length":140,"allowed_recipients":[],"can_be_recurring":false,"supported_file_formats":[],"can_be_scheduled":false}},"bic":"DEMODE01","additional_icons":{"60x60":"https://api.figo.me/assets/images/accounts/default_60.png","84x84":"https://api.figo.me/assets/images/accounts/default_84.png","192x192":"https://api.figo.me/assets/images/accounts/default_192.png","256x256":"https://api.figo.me/assets/images/accounts/default_256.png","96x96":"https://api.figo.me/assets/images/accounts/default_96.png","72x72":"https://api.figo.me/assets/images/accounts/default_72.png","144x144":"https://api.figo.me/assets/images/accounts/default_144.png","120x120":"https://api.figo.me/assets/images/accounts/default_120.png","48x48":"https://api.figo.me/assets/images/accounts/default_48.png"},"currency":"EUR","supported_tan_schemes":[{"medium_name":"","name":"iTAN","tan_scheme_id":"M1776909.1","additional_info":{}},{"medium_name":"Girocard","name":"chipTAN optisch","tan_scheme_id":"M1776909.2","additional_info":{}},{"medium_name":"Girocard","name":"chipTAN manuell","tan_scheme_id":"M1776909.3","additional_info":{}},{"medium_name":"","name":"photoTAN","tan_scheme_id":"M1776909.4","additional_info":{}}],"iban":"DE67900900424711951500","account_number":"4711951500","preferred_tan_scheme":null,"in_total_balance":true,"owner":"Demo","icon":"https://api.figo.me/assets/images/accounts/default.png","type":"Giro account","name":"Girokonto","lastTransaction":{"value_date":"2016-10-10T00:00:00.000Z","bank_name":"Demobank","account_id":"A1776909.1","bank_code":"90090042","currency":"EUR","purpose":"Ihre Bestellung Vom 01.03. / Re-Nr. 9123093129013290","transaction_code":4,"booked":true,"booking_date":"2016-10-10T00:00:00.000Z","name":"Fidibus Holzspan Gmbh & Co. Kg","creation_timestamp":"2016-10-11T03:05:44.000Z","amount":-167.12,"account_number":"4711951501","visited":true,"modification_timestamp":"2016-10-11T03:05:44.000Z","type":"Direct debit","transaction_id":"T1776909.2","booking_text":"Lastschrift"}},{"status":{"sync_timestamp":"2016-10-11T03:05:46.000Z","code":1,"success_timestamp":"2016-10-11T03:05:46.000Z"},"bank_name":"Demobank","balance":{"balance_date":"2016-10-11T00:00:00.000Z","balance":2190.42,"monthly_spending_limit":0,"credit_line":0},"account_id":"A1776909.2","bank_code":"90090042","auto_sync":true,"save_pin":true,"bank_id":"B1776909.1","supported_payments":{},"bic":"DEMODE01","additional_icons":{"60x60":"https://api.figo.me/assets/images/accounts/default_60.png","84x84":"https://api.figo.me/assets/images/accounts/default_84.png","192x192":"https://api.figo.me/assets/images/accounts/default_192.png","256x256":"https://api.figo.me/assets/images/accounts/default_256.png","96x96":"https://api.figo.me/assets/images/accounts/default_96.png","72x72":"https://api.figo.me/assets/images/accounts/default_72.png","144x144":"https://api.figo.me/assets/images/accounts/default_144.png","120x120":"https://api.figo.me/assets/images/accounts/default_120.png","48x48":"https://api.figo.me/assets/images/accounts/default_48.png"},"currency":"EUR","supported_tan_schemes":[{"medium_name":"","name":"iTAN","tan_scheme_id":"M1776909.5","additional_info":{}},{"medium_name":"Girocard","name":"chipTAN optisch","tan_scheme_id":"M1776909.6","additional_info":{}},{"medium_name":"Girocard","name":"chipTAN manuell","tan_scheme_id":"M1776909.7","additional_info":{}},{"medium_name":"","name":"photoTAN","tan_scheme_id":"M1776909.8","additional_info":{}}],"iban":"DE40900900424711951501","account_number":"4711951501","preferred_tan_scheme":null,"in_total_balance":true,"owner":"Demo","icon":"https://api.figo.me/assets/images/accounts/default.png","type":"Savings account","name":"Sparkonto","lastTransaction":{"value_date":"2012-02-27T00:00:00.000Z","bank_name":"Demobank","account_id":"A1776909.2","bank_code":"90090042","currency":"EUR","purpose":"Sparen","transaction_code":8,"booked":true,"booking_date":"2012-02-27T00:00:00.000Z","name":"Girokonto","creation_timestamp":"2016-10-11T03:05:45.000Z","amount":25,"account_number":"4711951500","visited":true,"modification_timestamp":"2016-10-11T03:05:45.000Z","type":"Standing order","transaction_id":"T1776909.87","booking_text":"Dauerauftrag"}},{"status":{"sync_timestamp":"2016-10-11T03:05:46.000Z","code":1,"success_timestamp":"2016-10-11T03:05:46.000Z"},"bank_name":"Demobank","balance":{"balance_date":null,"balance":11754.65,"monthly_spending_limit":0,"credit_line":0},"account_id":"A1776909.3","bank_code":"90090042","auto_sync":true,"save_pin":true,"bank_id":"B1776909.1","supported_payments":{},"bic":"","additional_icons":{"60x60":"https://api.figo.me/assets/images/accounts/default_60.png","84x84":"https://api.figo.me/assets/images/accounts/default_84.png","192x192":"https://api.figo.me/assets/images/accounts/default_192.png","256x256":"https://api.figo.me/assets/images/accounts/default_256.png","96x96":"https://api.figo.me/assets/images/accounts/default_96.png","72x72":"https://api.figo.me/assets/images/accounts/default_72.png","144x144":"https://api.figo.me/assets/images/accounts/default_144.png","120x120":"https://api.figo.me/assets/images/accounts/default_120.png","48x48":"https://api.figo.me/assets/images/accounts/default_48.png"},"currency":"EUR","supported_tan_schemes":[],"iban":"","account_number":"4711951502","preferred_tan_scheme":null,"in_total_balance":true,"owner":"Demokonto","icon":"https://api.figo.me/assets/images/accounts/default.png","type":"Depot","name":"Wertpapierdepot","lastTransaction":""}]');
    }

    return {
      saveBankAccounts: saveBankAccounts,
      getBankAccounts: getBankAccounts,
      getUserData: getUserData,
      setUserData: setUserData,
      setToken: setToken,
      getToken: getToken,
      setUserAccount: setUserAccount,
      getUserAccounts: getUserAccounts
    }

  }




})();

