/* global feeling */
'use strict'

feeling.controller('DetailedCtrl', function($scope, Feeling, originalConcepts, responseConcepts, originalEntities, responseEntities) {
	$scope.originalInput = Feeling.originalInput || "Original message not found."	
	$scope.responseInput = Feeling.responseInput || "Response draft not found."
	$scope.emotionVariance = Feeling.emotionVariance
	$scope.responseEmotions = Feeling.responseEmotions
	$scope.originalEmotions = Feeling.originalEmotions
	$scope.originalConcepts = originalConcepts
	$scope.responseConcepts = responseConcepts
	$scope.originalEntities = originalEntities
	$scope.responseEntities = responseEntities
	$scope.originalConceptsList = null
	$scope.responseConceptsList = null
		

	$scope.originalConceptsCheck = function(string) {
		if (!$scope.originalConceptsList) {
			$scope.originalConceptsList = []
			for (var prop in originalConcepts) {
				$scope.originalConceptsList.push(originalConcepts[prop].text)
			}
		}
		if ($scope.originalConceptsList.indexOf(string) > -1) {
			return "Yes"
		} else {
			return "No"
		}
	}

	$scope.responseConceptsCheck = function(string) {
		if (!$scope.responseConceptsList) {
			$scope.responseConceptsList = []
			for (var prop in responseConcepts) {
				$scope.responseConceptsList.push(responseConcepts[prop].text)
			}
		}
		if ($scope.responseConceptsList.indexOf(string) > -1) {
			return "Yes"
		} else {
			return "No"
		}
	}

	$scope.originalEntityLookup = function(entityName) {
		let originalEntity = $scope.originalEntities.filter(entity => entity.text.toLowerCase() === entityName.toLowerCase())
		if (originalEntity.length === 0) {
			return "N/A"
		} else {
			return originalEntity[0].sentiment.type
		}
	}

	$scope.responseEntityLookup = function(entityName) {
		let responseEntity = $scope.responseEntities.filter(entity => entity.text.toLowerCase() === entityName.toLowerCase())
		if (responseEntity.length === 0) {
			return "N/A"
		} else {
			return responseEntity[0].sentiment.type
		}
	}
})


