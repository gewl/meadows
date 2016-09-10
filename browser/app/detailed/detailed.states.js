feeling.config(function ($stateProvider) {
	$stateProvider.state('detailedReport', {
		url: '/feelings/detailed',
		templateUrl: 'browser/app/detailed/templates/detailed.html',
		controller: 'DetailedCtrl'
	})
})
