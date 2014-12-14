'use strict';

/**
 * @ngdoc overview
 * @name vitacademicsForWebApp
 * @description
 * # vitacademicsForWebApp
 *
 * Main module of the application.
 */
angular
    .module('vitacademicsForWebApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'LocalStorageModule'
    ])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(function($routeProvider) {
        $routeProvider
            // .when('/', {
            //     templateUrl: 'views/main.html',
            //     controller: 'MainCtrl'
            // })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/me', {
                templateUrl: 'views/me.html',
                controller: 'MeCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
  .run(['$rootScope', '$location', 'localStorageService',
      function ($rootScope, $location, localStorageService) {
          // keep user logged in after page refresh
          $rootScope.globals = localStorageService.get('globals') || {};
          $rootScope.$on('$locationChangeStart', function () {
              // redirect to login page if not logged in
              if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                  $location.path('/login');
              }
          });
      }]);
