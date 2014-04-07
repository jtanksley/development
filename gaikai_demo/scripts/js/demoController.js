'use strict'
/* demoController	J. Tanksley 04/02/2014
	Making a small controller to bring in a json file I created from a database query.  I'm using the json file because I won't be hosting the demo so I want to make sure it can be seen.
*/
var demoControllers = angular.module('demoControllers',[]);

//gonna use simple http here instead of creating a service page. It's low-level on purpose.
/*
demoControllers.controller('CatCtrl',function($scope,$http){
	$http.get('scripts/json/categories.json').success(function(data){
		$scope.categories = data;
		
	});
	$scope.orderProp = 'category';
*/
demoControllers.controller('CatCtrl',['$scope','$http',
	function($scope, $http){
		$http.get('recipes/categories.json').success(function(data){
			$scope.categories = data;
		});
		$scope.orderProp = 'category';
	}]);
demoControllers.controller('RecCtrl',['$scope','$routeParams', '$http',
	function($scope, $routeParams, $http){
			console.log('recipes/' +$routeParams.recipeID+'.json');
			$http.get('recipes/' + $routeParams.recipeID + '.json').success(function(data){
				$scope.recipe = data;
			});		
	}]);