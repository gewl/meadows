feeling.config(function ($stateProvider) {
	$stateProvider.state('detailedReport', {
		url: '/feelings/detailed',
		templateUrl: 'browser/app/detailed/templates/detailed.html',
		controller: 'DetailedCtrl',
		resolve: {
			originalKeywords: function(Feeling) {
				return Feeling.alchemyCall("keywords", Feeling.originalInput)
				.then(function(result) {
					return result.keywords
				})
			}, 
			responseKeywords: function(Feeling) {
				return Feeling.alchemyCall("keywords", Feeling.responseInput)
				.then(function(result) {
					return result.keywords
				})
			},
			originalEntities: function(Feeling) {
				return Feeling.alchemyCall("entities", Feeling.originalInput)
				.then(function(result) {
					return result.entities
				})
			},
			responseEntities: function(Feeling) {
				return Feeling.alchemyCall("entities", Feeling.responseInput)
					.then(function(result) {
						return result.entities
					})
			}

		}
	})
})
