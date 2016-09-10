/* global feeling */
'use strict'

feeling.factory('Feeling', function($http) {
	let FactoryObj = {}

	FactoryObj.originalInput = null;
	FactoryObj.originalEmotions = null;
	FactoryObj.responseInput = null;
	FactoryObj.responseEmotions = null;
	FactoryObj.emotionVariance = null;

	FactoryObj.alchemyCall = function(method, text) {
		let parameters = {
			text: text
		}
		return $http.post('/api/' + method, parameters)
		.then(function(result) {
			return result.data
		})
	}

	return FactoryObj
})
