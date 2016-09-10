'use strict'

var feeling = angular.module('feeling', ['ui.router', 'ngMessages'])

feeling.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/', '/feelings')
}])

