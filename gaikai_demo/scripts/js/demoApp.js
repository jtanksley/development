'use strict'
/* demoApp.js	J. Tanksley		4/2/2014
	Model script.
*/
var demoApp = angular.module('demoApp',['ngRoute','demoControllers']);

//configure the model to have multiple views.
demoApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/recipes',{templateUrl: 'pages/categories.html', controller: 'CatCtrl'}).
	when('/recipes/:recipeID', {templateUrl: 'pages/recipes.html', controller: 'RecCtrl'}).
	otherwise({redirectTo: '/recipes'});
}]);
