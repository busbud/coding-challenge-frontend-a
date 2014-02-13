'use strict';

var app = angular.module('ngBusbudDemo', ['ngRoute', 'autocomplete', 'randomclass-directive'])
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(false)
			.hashPrefix('!')
		;
		
		$routeProvider
			.when('/', {controller: 'AppCtrl', templateUrl: '/app.html'})
		;
	})
	
	.controller('AppCtrl', function ($scope, $http) {
		$scope.departures = [];
		$scope.destinations = [];
		$scope.invalidDeparture = false;
		$scope.invalidDestination = false;
		
		$scope.getDepartures = function(val) {
			$scope.err = false;
			
			if (!val) {
				return
			}
			
			$http
				.get('/api/locations/' + val)
				.success(function(data) {
					$scope.departures = _.pluck(data, 'label');
					$scope.invalidDeparture = ($scope.departure && !$scope.departures.length);
				})
				.error(function(data, status, headers) {
					// error
					$scope.departures = [];
					$scope.err = true;
				})
			;
		};
		
		$scope.getDestinations = function(val) {
			$scope.err = false;
			
			if (!val) {
				return
			}
			
			$http
				.get('/api/locations/' + val)
				.success(function(data) {
					$scope.destinations = _.pluck(data, 'label');
					$scope.invalidDestination = ($scope.destination && !$scope.destinations.length);
				})
				.error(function(data, status, headers) {
					// error
					$scope.destinations = [];
					$scope.err = true;
				})
			;
		};
		
		$scope.submit = function() {
			// TODO: form submit action
		}
	})
;