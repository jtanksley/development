/*
	Instatiate services.
*/
jsonServices.$inject =['$rootScope','$http','$timeout'];
drugService.$inject = ['$rootScope', '$http', '$q'];
function jsonServices($rootScope,$http,$timeout){
	var factory = {};
	/*
	factory.msg = function(){
		return "This is a message from the patient service.";
	}
	*/
	factory.patients = function(){
		return $http.get('json/patients.json');
	}
	factory.labs = function(){
		return $http.get('json/labs.json');
	}	
	factory.messages = function(){
		return $http.get('json/messages.json');
	}
	factory.imaging = function(){
		return $http.get('json/imaging.json');
	}
	return factory;
}
function drugService($rootScope,$http,$q){
	//first external get for the poc 11/23/2015.
	var factory ={};
	
	factory.searchResults = function(){
		//return $http.get('http://jaya.epcs.com/listMeds/tylenol');
		return $http.get('json/drugs.json');
	}
	return factory;
}
angular
    .module('mainApp')
	.factory('jsonServices', jsonServices)
	.factory('drugService', drugService)
	
	;
