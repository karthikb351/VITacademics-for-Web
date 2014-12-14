'use strict';

/**
 * @ngdoc function
 * @name vitacademicsForWebApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the vitacademicsForWebApp
 */
angular.module('vitacademicsForWebApp')
    .filter('timeAgo', function() {
        return function(date) {
            return moment(new Date(date)).calendar();
        };
    })
    .controller('MeCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var data = localStorageService.get('globals').currentUser.data;
        $scope.courses = data.courses;
        $scope.currentCourse=data.courses[0];
        $scope.regno = data.regno;
        $scope.lastRefreshed = data.refreshed;

        $scope.removeDetails = function(course)	{
        	var dummy = JSON.parse( JSON.stringify( course) );
        	dummy.attendance.details='truncated';
        	return dummy;
        };

        $scope.getColorForPercentage=function(value)	{
        	var color = 'green';
        	if(value>=75 && value<80)	{
        		color = 'orange';
        	}
        	if(value<75)	{
        		color = 'red';
        	}
        	return color;
        };

        $scope.setCurrentCourse=function(course)	{
        	$scope.currentCourse=course;
        	$scope.currentCourse.percentage=course.attendance.attendance_percentage.slice(0,-1);
        };
    }]);
