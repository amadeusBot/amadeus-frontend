/**
 * Created by albertoherraiz on 10/10/16.
 */

(function () {
    'use strict';
    angular
        .module('AmadeusApp.directives')
        .directive('statementMapImg', statementMapImg)
        .directive('input', input);


    /**
     * @ngdoc directive
     * @name DBank.Statements.statementMapImg:statementMapImg
     *
     * @description
     * Create static Google map with geolocalized P2P movements and put this image in the header of dashboard screen
     *
     */
    function statementMapImg() {
        return {
            link: function ($scope, element, attr) {
                console.log("STATEMENTS MAP");

                var zoom = 17;
                var icon = "http://i.imgur.com/3T0M6gJ.png";

                //var src = get_static_style(mapStyle);

                //var markersText = '|41.444024,2.230580';
                console.log(attr);
                var markersText = "|" + attr.coordinates;
                var center = attr.coordinates;

                var mapSrc = "https://maps.googleapis.com/maps/api/staticmap?center=" + center + "&zoom=" + zoom + "&format=png&sensor=false&size=700x400&maptype=roadmap&markers=icon:" + icon + markersText;
                mapSrc = mapSrc.replace(/[\s]/g, ''); //delete spaces


                element.css({
                    'background-image': 'url(' + mapSrc + ')',
                    'background-size': 'cover',
                    'background-position': '50% 0px',
                    'background-repeat': 'no-repeat'
                });

                console.log(element);
            }
        };
    }

    function input($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function (scope, element, attr) {
                element.bind('focus', function (e) {
                    if (scope.onFocus) {
                        $timeout(function () {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function (e) {
                    if (scope.onBlur) {
                        $timeout(function () {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function (e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function () {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    }

})();

