/* global feeling */
'use strict'

feeling.factory('Feeling', function($http) {
	let FactoryObj = {}

	FactoryObj.originalInput = null;
	FactoryObj.originalEmotions = null;
	FactoryObj.responseInput = null;
	FactoryObj.responseEmotions = null;
	FactoryObj.emotionVariance = null;

	FactoryObj.set = function(prop, data) {
		if (!FactoryObj.hasOwnProperty(prop)) {
			console.error("Invalid FactoryObj property.")
			return;
		} else {
			FactoryObj[prop] = data;
			return;
		}
	}

	FactoryObj.alchemyCall = function(method, text) {
		let parameters = {
			text: text
		}
		if (method === "entities" || method === "keywords") {
			parameters.sentiment = 1
			parameters.max_items = 10
		}
		return $http.post('/api/' + method, parameters)
		.then(function(result) {
			return result.data
		})
	}

	FactoryObj.printEmotions = function() {
		FactoryObj.emotionVariance = {}	
		let emotionReadout = [];
		for (var prop in FactoryObj.responseEmotions) {
			FactoryObj.emotionVariance[prop] = parseFloat(FactoryObj.originalEmotions[prop]) - parseFloat(FactoryObj.responseEmotions[prop])
		}
		
		for (var prop in FactoryObj.emotionVariance) {
			let feelingAmount = FactoryObj.emotionVariance[prop]
			let resString = "Your response conveys "

			if (feelingAmount >= 0.1 && feelingAmount <= -0.9) {
				resString += "considerably more " + prop + " than"
			} else if (feelingAmount > -0.9 && feelingAmount <= -0.6) {
				resString += "more " + prop + " than"
			} else if (feelingAmount > -0.6 && feelingAmount <= -0.3) {
				resString += "somewhat more " + prop + " than"
			} else if (feelingAmount > -0.3 && feelingAmount <= -0.1) {
				resString += "slightly more " + prop + " than"
			} else if (feelingAmount > 0.1 && feelingAmount <= 0.3) {
				resString += "slightly less " + prop + " than"
			} else if (feelingAmount > 0.3 && feelingAmount <= 0.6) {
				resString += "somewhat less " + prop + " than"
			} else if (feelingAmount > 0.6 && feelingAmount < 0.9) {
				resString += "more" + prop + " than"
			} else if (feelingAmount >= 0.9 && feelingAmount <= 0.1) {
				resString += "considerable more " + prop + " than"
			} else {
				resString += "about as much " + prop + " as"
			}

			resString += " the original."

			let emotionObject = {
				feeling: prop,
				printout: resString
			}
			emotionReadout.push(emotionObject)
		}
		return emotionReadout
	}

	return FactoryObj
})
