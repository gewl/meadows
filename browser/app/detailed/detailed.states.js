feeling.config(function ($stateProvider) {
	$stateProvider.state('detailedReport', {
		url: '/feelings/detailed',
		templateUrl: 'browser/app/detailed/templates/detailed.html',
		controller: 'DetailedCtrl',
		resolve: {
			originalConcepts: function(Feeling) {
				return Feeling.alchemyCall("concepts", Feeling.originalInput)
				.then(function(result) {
					return result.concepts
				})
			}, 
			responseConcepts: function(Feeling) {
				return Feeling.alchemyCall("concepts", Feeling.responseInput)
				.then(function(result) {
					return result.concepts
				})
			},
			
		}
	})
})
