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
			Feeling.set("originalInput", $scope.input.original)
			Feeling.set("responseInput", $scope.input.response)
			Feeling.alchemyCall('emotion', $scope.input.original)
			.then(function(emotionJson) {
				// $scope.originalEmotions = emotionJson.docEmotions
				return Feeling.set("originalEmotions", emotionJson.docEmotions)
			})
			.then(function(res) {
				return Feeling.alchemyCall('emotion', $scope.input.response)
			})
			.then(function(emotionJson){
				// $scope.responseEmotions = emotionJson.docEmotions
				return Feeling.set("responseEmotions", emotionJson.docEmotions)
			})
			.then(function(res) {
				$scope.emotionReadout = Feeling.printEmotions()
				$scope.hasRun = true;			
				$scope.input.original = ""	
				$scope.input.response = ""	
			})
		}
	}

	//move this function to the factory now that you're moving the text onto factory variables	
	

})
