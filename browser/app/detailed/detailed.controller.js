/* global feeling */
'use strict'

feeling.controller('DetailedCtrl', function($scope, Feeling, originalKeywords, responseKeywords, originalEntities, responseEntities) {
	$scope.originalInput = Feeling.originalInput || "Original message not found."	
	$scope.responseInput = Feeling.responseInput || "Response draft not found."
	$scope.emotionVariance = Feeling.emotionVariance
	$scope.responseEmotions = Feeling.responseEmotions
	$scope.originalEmotions = Feeling.originalEmotions
	$scope.originalKeywords = originalKeywords
	$scope.responseKeywords = responseKeywords
	$scope.originalEntities = originalEntities
	$scope.responseEntities = responseEntities
	$scope.originalKeywordsList = null
	$scope.responseKeywordsList = null
		

	$scope.originalKeywordsCheck = function(string) {
		if (!$scope.originalKeywordsList) {
			$scope.originalKeywordsList = []
			for (var prop in originalKeywords) {
				$scope.originalKeywordsList.push(originalKeywords[prop].text)
			}
		}
		if ($scope.originalKeywordsList.indexOf(string) > -1) {
			return "Yes"
		} else {
			return "No"
		}
	}

	$scope.responseKeywordsCheck = function(string) {
		if (!$scope.responseKeywordsList) {
			$scope.responseKeywordsList = []
			for (var prop in responseKeywords) {
				$scope.responseKeywordsList.push(responseKeywords[prop].text)
			}
		}
		if ($scope.responseKeywordsList.indexOf(string) > -1) {
			return "Yes"
		} else {
			return "No"
		}
	}

	$scope.originalKeywordsLookup = function(entityName) {
		let originalKeyword = $scope.originalKeywords.filter(entity => entity.text.toLowerCase() === entityName.toLowerCase())
		if (originalKeyword.length === 0) {
			return "N/A"
		} else {
			return originalKeyword[0].sentiment.type
		}
	}

	$scope.responseKeywordsLookup = function(entityName) {
		let responseKeyword = $scope.responseKeywords.filter(entity => entity.text.toLowerCase() === entityName.toLowerCase())
		if (responseKeyword.length === 0) {
			return "N/A"
		} else {
			return responseKeyword[0].sentiment.type
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


