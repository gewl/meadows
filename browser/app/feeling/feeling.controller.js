/* global feeling */
'use strict'

feeling.controller('FeelingCtrl', function($scope, Feeling) {
	$scope.error = false;

	$scope.emotionReadout = []
	$scope.hasRun = false

	$scope.getEmotions = function() {
		if (!$scope.input.original || !$scope.input.response) {
			$scope.error = true		
		} else {
			$scope.error = false
			Feeling.alchemyCall('emotion', $scope.input.original)
			.then(function(emotionJson) {
				$scope.originalEmotions = emotionJson.docEmotions
			})
			.then(function(res) {
				return Feeling.alchemyCall('emotion', $scope.input.response)
			})
			.then(function(emotionJson){
				$scope.responseEmotions = emotionJson.docEmotions
				$scope.emotionVariance = {}
				for (var prop in $scope.responseEmotions) {
					$scope.emotionVariance[prop] = parseFloat($scope.originalEmotions[prop]) - parseFloat($scope.responseEmotions[prop])
				}
				
				$scope.printEmotions();	
				$scope.input.original = ""	
				$scope.input.response = ""	
			})
		}
	}

	//move this function to the factory now that you're moving the text onto factory variables	
	$scope.printEmotions = function() {
		for (var prop in $scope.emotionVariance) {
				let feelingAmount = $scope.emotionVariance[prop]
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
				$scope.emotionReadout.push(emotionObject)
			}
		$scope.hasRun = true
		}

})
