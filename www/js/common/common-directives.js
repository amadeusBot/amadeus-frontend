(function () {
  'use strict';
  angular
    .module('AmadeusApp.directives')
    .directive("limitTo", limitTo)
    .directive("numbersOnly", numbersOnly);

  function limitTo() {
    return {
      restrict: "A",
      link: function (scope, elem, attrs) {
        var limit = parseInt(attrs.limitTo);
        angular.element(elem).on("keypress", function (e) {
          if (this.value.length == limit) e.preventDefault();
        });
      }
    }
  }


  // Directive to check if inputs are numbers
  function numbersOnly() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        element.bind('keyup', function (e) {
          if (parseInt(e.keyCode) === parseInt(8)) {
            if (element[0].previousElementSibling) {
              element[0].previousElementSibling.focus();
            } else {
              element[0].focus();
            }
          }

          if (element.val().length === parseInt(element.attr('maxlength'))) {
            if (element[0].nextElementSibling) {
              element[0].nextElementSibling.focus();
            }
            else {
              element[0].blur();
            }
          }
        });
      }
    };
  }

})();

