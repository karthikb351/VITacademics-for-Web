'use strict';

/**
 * @ngdoc function
 * @name vitacademicsForWebApp.factory:AuthenticationService
 * @description
 * # AuthenticationService
 * Controller of the vitacademicsForWebApp
 */
angular
    .module('vitacademicsForWebApp')
    .factory('AuthenticationService', ['$http', '$rootScope', 'localStorageService',

        function($http, $rootScope, localStorageService) {
            var service = {};
            service.Login = function(regno, dob, callback) {
                $http.get('http://localhost:3000/api/vellore/login/auto', {
                        params: {
                            regno: regno,
                            dob: dob
                        }
                    })
                    .success(function(data) {
                        console.log(data);
                        if (data.status.code === 0) {
                            $http.get('http://localhost:3000/api/vellore/data/first', {
                                    params: {
                                        regno: regno,
                                        dob: dob
                                    }
                                })
                                .success(function(data) {
                                    console.log(data);
                                    callback(data);
                                })
                                .error(function(data) {
                                    console.warn(data);
                                    callback(data);
                                });
                        } else {
                            console.warn(data);
                            callback(data);
                        }
                    })
                    .error(function(data) {
                        console.warn(data);
                        callback(data);
                    });
            };
            service.SetCredentials = function(regno, dob, data) {
                $rootScope.globals = {
                    currentUser: {
                        regno: regno,
                        dob: dob,
                        data: data
                    }
                };
                localStorageService.set('globals', $rootScope.globals);
            };
            service.ClearCredentials = function() {
                $rootScope.globals = {};
                localStorageService.remove('globals');
            };

            return service;
        }
    ]);