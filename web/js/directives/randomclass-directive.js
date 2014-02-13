'use strict';

angular.module('randomclass-directive', [])
	.directive('randomClass', function() {
		return {
			restrict: 'A',
			scope: {
				prefix: '@classPrefix',
				min: '=',
				max: '='
			},
			link: function(scope, element, attrs) {
				var num = Math.floor(Math.random() * (scope.max - scope.min + 1)) + scope.min;
				element.addClass(scope.prefix + num.toString());
			}
		}
	})
;