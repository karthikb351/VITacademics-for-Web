'use strict';

/**
 * @ngdoc function
 * @name vitacademicsForWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the vitacademicsForWebApp
 */
angular.module('vitacademicsForWebApp')
.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
         $scope.user = {}

        // reset login status
        AuthenticationService.ClearCredentials();

        function getDOBString(date) {
            var formatted = '';
            formatted = ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
            console.log(formatted);
            return formatted;
        }


        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.user.regno, getDOBString($scope.user.dob), function(response) {
                if(response.status.code === 0) {
                    AuthenticationService.SetCredentials($scope.user.regno, getDOBString($scope.user.dob), response);
                    $location.path('/me');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);