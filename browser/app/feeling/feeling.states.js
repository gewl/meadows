feeling.config(function ($stateProvider) {
	$stateProvider.state('feelingComparer', {
		url: '/feelings',
		templateUrl: "/browser/app/feeling/templates/feeling.html",
		controller: "FeelingCtrl"
	})
})
