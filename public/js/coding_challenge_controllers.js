var coding_challenge_controllers = angular.module('coding_challenge_controllers', []);

coding_challenge_controllers.controller('IndexCtrl', ['$scope', '$http', function(scope, http) {

	if (!scope.busbud_token || scope.busbud_token.length === 0) {
		console.log('Authenticating...');
		authentication_url = 'http://busbud-napi-prod.global.ssl.fastly.net/auth/guest';
		http.get(authentication_url).
		success(function(data, status, headers, config) {
			scope.busbud_token = data.token;
			console.log('Authenticated!');
		}).
		error(function(data, status, headers, config) {
			console.log("Error while authenticating");
		});

		scope.submit = function() {
			console.log('got here!')
			if (scope.selected_departure && scope.selected_destination) {
				scope.form_label = 'Submitted.';
			}
			else {
				scope.form_label = 'Please enter a departure and destination city.';
			}
			scope.form_label_display = true;
		};
	}
}]);