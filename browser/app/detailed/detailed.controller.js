/* global feeling */
'use strict'

feeling.controller('DetailedCtrl', function($scope, Feeling) {
	$scope.originalInput = Feeling.originalInput || "Original message not found."	
	$scope.responseInput = Feeling.responseInput || "Response draft not found."
	$scope.emotionVariance = Feeling.emotionVariance
	$scope.responseEmotions = Feeling.responseEmotions
	$scope.originalEmotions = Feeling.originalEmotions
})
