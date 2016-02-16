/**
 * Controllers 
 *
 */

/**
 * MainCtrl - controller
 */
//Before I can use services I need to inject them... 
//Let's set them up at the top.
MailCtrl.$inject = ['$rootScope','$stateParams','$scope','$http','$state','$q','jsonServices'];
LabsCtrl.$inject = ['$rootScope','$stateParams','$scope','$http','$state','$q','jsonServices'];
ImagingCtrl.$inject = ['$rootScope','$stateParams','$scope','$http','$state','$q','jsonServices'];
AllergiesCtrl.$inject = ['$rootScope', '$scope', '$modal', '$q','drugService', '$http','$filter'];
function MainCtrl() {
	
    this.userName = 'CGM Admin';
    this.helloText = 'Welcome to CGM webEHR Patient Search Testing Phase 1';
    this.descriptionText = 'Testing patient search functionality.';
	$(document).bind('keydown', 'alt+shift+f', function(){
		$('#top-search').focus().select();		
	});	
}
function HeaderCtrl($scope,$rootScope){
	//Place a patient detail header wherever I want...
	$rootScope.patient = $scope.patient;
}
function SearchCtrl($rootScope,$scope,$filter,$state){
	
	//Bring in initial values.	
	//$scope.keywords = "";
	$scope.kw = '';
		
	$scope.patient = $rootScope.patient;	
	//Check for empty patient.
	$scope.isEmpty = function(obj){
		for(var key in obj){
			if(obj.hasOwnProperty){
				return false;
			}
		}
		return true;
	}
	if($scope.isEmpty($scope.patient)){
		$rootScope.patNav = false;
		$rootScope.showThis = false;
		}else {
			$rootScope.patNav = true;
		$rootScope.showThis = true;
	}	
	//since you can come in from the top nav...
	//check to see if we have search results.
	if(!$scope.isEmpty($rootScope.searchResults)){
		$scope.patients = $rootScope.searchResults;
	}else{
		$scope.patients = $rootScope.patients;
	}
	//if the current patient scope is empty set it
	//as the patient rootScope. We are altering 
	//navigation based on if there is a patient object.
	if($scope.patientBool){
		$rootScope.patient = $scope.patient = {};		
	}
	//initialize today's date.
	$scope.today = $filter('date')(new Date(),"MM/dd/yyyy");	
	
	//Create the search functionality.
	$scope.search = function(){		
		$scope.tabTitle = "Patient Search Results";
		$scope.searchResults ={}
		$scope.patientArr = [];
		//watch for changes to the model.
		/*
		$scope.$watch('keywords',function(newVal, oldVal){
			$scope.keywords.watch = newVal;
		});
		*/
		//allow for multiple keywords		
		$scope.list = $rootScope.keywords.split(' ');		
		angular.forEach($scope.list,function(keyword){
			if(keyword){
				//search patient list for keywords.
				angular.forEach($rootScope.patients, function(value){
					if(value.mrn.indexOf(keyword) > -1 || value.id.indexOf(keyword) > -1 || value.lastName.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || value.firstName.toLowerCase().indexOf(keyword.toLowerCase())> -1){
					$scope.patientArr.push(value);
					}					
				});
				//remove any potential duplicates, i.e., a two word search on first and last name will
				//return one person's last name twice because it returns matches on both names separately.
				$scope.filterArr = {};
				for (var i=0; i< $scope.patientArr.length; i++){
					$scope.filterArr[$scope.patientArr[i]['id']] = $scope.patientArr[i];
				}
				$scope.patientArr = new Array();
				for(var key in $scope.filterArr){
					$scope.patientArr.push($scope.filterArr[key]);
				}
			}else{
				//there are no keywords so do
			}
		});
		//If we have results from the patient search return those results for 
		//user selection. Otherwise, display "No Patients Found.".		
		$rootScope.searchResults = $scope.patientArr;
	}	
	//clearPatient to reset the navigational menu.
	$scope.clearPatient = function(){
		$rootScope.keywords = '';
		$scope.kw ='';
		$rootScope.patient = $scope.patient = {};		
		$rootScope.patNav = false;
		$rootScope.showThis = false;
	}	
	
	$scope.clearSearch = function(){
		$rootScope.showThis = false;
		$rootScope.patNav = false;
		$rootScope.keywords = '';
		$scope.kw ='';
		$rootScope.searchResults = {};		
		$rootScope.patient = $scope.patient = {};
		
		if($rootScope.currentState = "index.main"){
			state.go('index.main');
		}
		if($rootScope.currentState != 'index.main' || $rootScope.currentState != 'index.search' ){
			//navigate back to index.search page.
			$state.go('index.search');
		}
	}
	//I'm coming in from the top nav and it wants to to a submit on enter keypress...
	//customize the submit.
	$scope.searchSubmit = function(){		
		//we have to call the search method here.
		$rootScope.patient = $scope.patient = {};
		$rootScope.keywords = $scope.kw;		
		$scope.search();			
		$state.go('index.search');
	}	
}
function SearchResultsCtrl($rootScope,$scope,$filter, $state, $location){
	$scope.limit = "10";
	$scope.resultCount = $rootScope.searchResults.length;
	$scope.today = $filter('date')(new Date(),"MM/dd/yyyy");
	$scope.currentPatient = {};
	$scope.$watch('searchResults', function(newVal, oldVal){
		
		if($rootScope.keywords == ''){
					
			$scope.tabTitle = "Recent Patients";
			$scope.patients = $rootScope.patients;	
		}else{
			$scope.tabTitle = "Patient Search Results";		
			$scope.patients = $rootScope.searchResults;
		}
		//doing a new search, patient related screens should be hidden.
		$rootScope.showThis = false;
		$rootScope.patNav = false;
	});
	$scope.selectPatient = function(index){		
		$rootScope.showThis = true;
		$rootScope.patNav = true;	
		if($rootScope.keywords == ''){
			$rootScope.patient = $rootScope.patients[index];
		}else{			
			$rootScope.patient = $rootScope.searchResults[index];			
		}
		$scope.currentPatient = $rootScope.patient;		
	}
	$scope.viewChart = function(){		
		$rootScope.showThis = true;
		$rootScope.patNav = true;
		$rootScope.patient.lastViewed = $scope.today;
		$state.go('index.chart');
	}
}

function MailCtrl($rootScope,$stateParams,$scope, $http, $state,$q,jsonServices){
	$q.when(jsonServices.messages().then(function(d){
		$rootScope.messages = d.data;
	})).then(function(){
		$scope.messages = $rootScope.messages;
	});
	$scope.view = function(index){		
		$scope.message = $scope.messages[index];
		$stateParams.message  = $scope.message;
		$rootScope.message = $stateParams.message;
		$state.go('mailbox.email_view', {message:$rootScope.message});
	}
	
}
function DateTimeCtrl(){
	$scope.today = function(){
		$scope.dt = new Date();
	}
	$scope.today();
	$scope.clear = function(){
		$scope.dt = null;
	}
	$scope.toggleMin = function(){
		$scope.minDate = $scope.minDate ? null : new Date();
	}
	$scope.toggleMin();
	$scope.maxDate = new Date(2065, 12, 31);
	
	$scope.open = function($event){
		$scope.status.opened = true;
	}
	$scope.dateOptions ={
		format: 'mm/dd/yyyy',
		language: 'en',
		autoclose: true,
		weekStart: 0
	};
	$scope.formats = ['mm/dd/yyyy','mm-dd-yyyy','shortDate'];
	$scope.format = $scope.formats[0];
	
	$scope.status = {
		opened: false
	};
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() +2);
	
	$scope.events = [{
		date: tomorrow,
		status: 'full'
	},
	{
		date: afterTomorrow,
		status: 'partially'
	}];
	$scope.getDayClass = function(date, mode){
		if(mode === 'day'){
			var dayToCheck = new Date(date).setHours(0,0,0,0);
			for (var i=0; i < $scope.events.length; i++){
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
				if(dayToCheck === currentDay){
					return $scope.events[i].status;
				}
			}
		}
		return '';
	}
}
function DemographicsCtrl($rootScope,$scope){
	$scope.patient = $rootScope.patient;
	$scope.sexes = [{
			value: "m",
			text: "male"
		},{
			value: "f",
			text: "female"
		}]	
	$scope.master = {};
	
	$scope.update = function(){		
		$scope.master = angular.copy($scope.patient);
		$rootScope.patient = $scope.master;
		//we also need to send the patient change back to the
		//$rootScope patient list.		
		angular.forEach($rootScope.patients, function(value,key){
			if($rootScope.patients[key].id === $scope.master.id){
				$rootScope.patients[key] = $scope.master;
			}
			
		});
		
	}	
}


function LabsCtrl($rootScope,$stateParams,$scope,$http,$state,$q,jsonServices){
	$scope.showThis = false;
	$q.when(jsonServices.labs().then(function(d){
		$rootScope.labs = d.data;
	})).then(function(){
		$scope.labs = $rootScope.labs;
	});
	
	$scope.view = function(index){
		$scope.lab = $scope.labs[index];
		$scope.showThis = true;
	}
}
function VitalsCtrl($rootScope, $scope){

	$scope.patients = $rootScope.patients;
	$scope.patient = $rootScope.patient;
	$scope.showThis = false;
	
	$scope.view = function(index){
		$scope.patient.vitalsDetail = $scope.patient.vitals[index];
	
		$scope.showThis = true;
	}
	$scope.add = function(){	
		
		$scope.master = angular.copy($scope.patient.vitalsDetail);
		console.log($scope.master);
		$rootScope.patient.vitals.push($scope.master);
		//push revised patient data back into the rootscope of patients.	
		angular.forEach($rootScope.patients, function(value,key){
			if($rootScope.patients[key].id == $rootScope.patient.id){	
				$rootScope.patients[key] = $rootScope.patient;
			}			
		});
		$scope.patients = $rootScope.patients;
		$scope.patient = $rootScope.patient;	
		console.log($rootScope.patient);
		//need to rebuild the previous vitals list and add this new to the view.
		$scope.$watch('patient.vitals', function(newVal, oldVal){
			$scope.patient.vitals.watch = newVal;
		});		
	}
}
function AllergiesCtrl($rootScope, $scope, $modal, $q, drugService, $http,$filter){
	$scope.patients = $rootScope.patients;
	$scope.patient = $rootScope.patient;
	$scope.showThis = false;
	$scope.isDisabled = true;
	$scope.isAdd = "0";
	$scope.today = $filter('date')(new Date(),"MM/dd/yyyy");
	$scope.openAdd = null;
	$scope.openEdit = null;
	
	$scope.view = function(allergy){
		$scope.patient.allergyDetail = allergy;
		//console.log($scope.patient.allergyDetail);
		$scope.showThis = true;
		$scope.isDisabled = false;
	}
	
	$scope.hide = function(allergy){
		//$scope.patient.allergyDetail.hidden = "1";
		/*
		$scope.showThis = false;
		$scope.isDisabled = true;
		$scope.patient.allergies.splice($scope.patient.allergies.indexOf(allergy),1);		
		console.log($scope.patient.allergyDetail);
		*/
		$scope.patient.allergyDetail.hidden = "1";
		$scope.patient.allergyDetail.hiddenDate = $scope.today;
		$scope.master = angular.copy($scope.patient.allergyDetail);
		
		angular.forEach($rootScope.patient.allergies, function(value,key){
			if($rootScope.patient.allergies[key].id == $rootScope.patient.allergies.id){	
				$rootScope.patient.allergies[key] = $rootScope.patient.allergies;
			}			
		});
		//add patient changes back to the patients list rootScope.
		angular.forEach($rootScope.patients, function(value,key){
			if($rootScope.patients[key].id === $rootScope.patient.id){
				$rootScope.patients[key] = $rootScope.patient;
			}
			
		});		
		$scope.$watch('patient.allergies', function(newVal, oldVal){
			$scope.patient.allergies.watch = newVal;			
			$rootScope.patient.allergies.watch= newVal;			
		});		
		$scope.showThis = false;
		$scope.isDisabled = true;
	}
	$scope.openEdit = function(widget){
		//is this an edit or an add.
		$scope.isAdd = "0";
		$rootScope.isAdd = "";
		$rootScope.isAdd = $scope.isAdd;	
		 var modalInstance = $modal.open({
		  templateUrl: 'views/form_allergies.html',
		  controller: 'AllergiesCtrl',
		  resolve: {
			widget: function () {
			  
			  return widget;
			  
			},
			opened :function(){
			  console.log('asd')
			}
		  }
		});
		
	}
	$scope.openAdd = function(widget){
		//is this an edit or an add.
		$scope.isAdd = "1";
		$rootScope.isAdd = "";
		$rootScope.isAdd = $scope.isAdd;	
		
		//$scope.patient.allergyDetail.allergen = "";
		//$scope.patient.allergyDetail.reaction = "";
		 var modalInstance = $modal.open({
		  templateUrl: 'views/form_allergies.html',
		  controller: 'AllergiesCtrl',
		  resolve: {
			widget: function () {			  
			  return widget;			  
			},
			opened :function(){
				 if($rootScope.patient.hasOwnProperty('allergies')){
					$scope.patient.allergyDetail = {};
					$scope.patient.allergyDetail.id = $rootScope.patient.allergies.length;
					$scope.patient.allergyDetail.date = $scope.today;
					$scope.patient.allergyDetail.hidden = "0";
					$scope.patient.allergyDetail.hiddenDate = "";
					$scope.patient.allergyDetail.recordedBy = "CGM Admin";
				}
				else{
					$rootScope.patient.allergies = [];
					$scope.patient.allergyDetail = {};
					$scope.patient.allergyDetail.id = "1";
					$scope.patient.allergyDetail.date = $scope.today;
					$scope.patient.allergyDetail.hidden = "0";
					$scope.patient.allergyDetail.hiddenDate = "";
					$scope.patient.allergyDetail.recordedBy = "CGM Admin";				
				}
			}
			
		  }
		});
		
	}
	
	$scope.add = function(){		
		$scope.master = angular.copy($scope.patient.allergyDetail);
		console.log($scope.master);
		console.log($rootScope.isAdd);
		
		//$rootScope.patient.allergies.push($scope.master);
		//add changes back to the patient rootScope.		
		if($rootScope.isAdd == "1"){//We are adding a new record and need an additional line and need to add whole record.
			console.log('add a new record');
			
			$rootScope.patient.allergies.push($scope.master);
			//push revised patient data back into the rootscope of patients.	
			angular.forEach($rootScope.patients, function(value,key){
				if($rootScope.patients[key].id == $rootScope.patient.id){	
					$rootScope.patients[key] = $rootScope.patient;
				}			
		});
		}else{//We are updating an existing allergy record.
			console.log('this is firing because we think we have an existing record');
			angular.forEach($rootScope.patient.allergies, function(value,key){
				if($rootScope.patient.allergies[key].id == $rootScope.patient.allergies.id){	
					$rootScope.patient.allergies[key] = $rootScope.patient.allergies;
				}			
			});
			//add patient changes back to the patients list rootScope.
			angular.forEach($rootScope.patients, function(value,key){
				if($rootScope.patients[key].id === $rootScope.patient.id){
					$rootScope.patients[key] = $rootScope.patient;
				}
				
			});
		}
		$scope.patient = $rootScope.patient			
		$scope.patients = $rootScope.patients;
		console.log($rootScope.patient);
		//console.log($rootScope.patients);
		//reflect changes to the allergies list.
		
		$scope.$watch('patient.allergies', function(newVal, oldVal){
			$scope.patient.allergies.watch = newVal;			
			$rootScope.patient.allergies.watch= newVal;
		});	
		//console.log(Object.keys($scope.openAdd));
		$scope.$dismiss();
	}
	/*------------------------------------------------------
		Sortable Headers
	------------------------------------------------------*/
	$scope.headers = ['Date','Allergen','Reaction','RecordedBy'];
	$scope.sortColumn = "Date";
	
	$scope.toggleSort = function(index) {		
		console.log($scope.sortColumn);
		if($scope.sortColumn === $scope.headers[index]){
			
			$scope.reverse = !$scope.reverse;
		}                    
		$scope.sortColumn = $scope.headers[index];
		console.log($scope.sortColumn);
	}
	
	//--------------------------------------------------------
	//  Adding for drug search
	//--------------------------------------------------------
	
	$rootScope.drugSearchResults = {};
	$scope.searchResults = [];
	$scope.drug = {};
		$q.when(drugService.searchResults().then(function(d){
		$rootScope.drugSearchResults = d.data;		
		//$scope.searchResults = d.data;
		})).then(function(){
			//$scope.searchResults = $rootScope.drugSearchResults;
			angular.forEach($rootScope.drugSearchResults[0].result,function(key,value){
				//console.log(key, value);
				$scope.searchResults.push(key.ProductNameLong[0]);
				//console.log($scope.searchResults[0]);
			});	
			//console.log($scope.searchResults);
		});
	
	$scope.search = function(){
		console.log('searchClicked');
	
		$rootScope.drugSearchResults = {};
		$q.when(drugService.searchResults().then(function(d){
		$rootScope.drugSearchResults = d.data;
		console.log(d.data);
		//$scope.searchResults = d.data;
		})).then(function(){
			//$scope.searchResults = $rootScope.drugSearchResults;
			//console.log($scope.searchResults);
		});
		
		/*$http.get('http://jaya.epcs.com/listMeds/tylenol').then(function(results){
			console.log(results.data);
		});*/
	}
	
	$scope.noAllergies = function(){
		//Need to create a record similiar to adding an allergy.
		$rootScope.patient.allergies = [];
		$scope.patient.allergyDetail = {};
		$scope.patient.allergyDetail.date = $scope.today;
		$scope.patient.allergyDetail.allergen = "NKA";
		$scope.patient.allergyDetail.reaction = "No Known Allergies";
		$scope.patient.allergyDetail.hidden = "0";
		$scope.patient.allergyDetail.hiddenDate = $scope.today;
		$scope.patient.allergyDetail.recordedBy = "CGM Admin" ;
		$rootScope.patient.allergies.push($scope.patient.allergyDetail);
		
		angular.forEach($rootScope.patients, function(value,key){
				if($rootScope.patients[key].id == $rootScope.patient.id){	
					$rootScope.patients[key] = $rootScope.patient;
				}			
		});
		
		$scope.$watch('patient.allergies', function(newVal, oldVal){
			//$scope.patient.allergies.watch = newVal;			
			$rootScope.patient.allergies.watch= newVal;
		});	
	}
	$scope.noMedAllergies = function(){
		//Need to create a record similiar to adding an allergy.
		$rootScope.patient.allergies = [];
		$scope.patient.allergyDetail = {};
		$scope.patient.allergyDetail.date = $scope.today;
		$scope.patient.allergyDetail.allergen = "NKMA";
		$scope.patient.allergyDetail.reaction = "No Known Medical Allergies";
		$scope.patient.allergyDetail.hidden = "0";
		$scope.patient.allergyDetail.hiddenDate = $scope.today;
		$scope.patient.allergyDetail.recordedBy = "CGM Admin" ;
		$rootScope.patient.allergies.push($scope.patient.allergyDetail);
		
		angular.forEach($rootScope.patients, function(value,key){
				if($rootScope.patients[key].id == $rootScope.patient.id){	
					$rootScope.patients[key] = $rootScope.patient;
				}			
		});
		
		$scope.$watch('patient.allergies', function(newVal, oldVal){
			//$scope.patient.allergies.watch = newVal;			
			$rootScope.patient.allergies.watch= newVal;
		});	
	}
}
function MedicationsCtrl($rootScope, $scope){
	$scope.patients = $rootScope.patients;
	$scope.patient = $rootScope.patient;
	$scope.showThis = false;
	//console.log($scope.patient.medications);
	
	$scope.view = function(index){
		$scope.patient.medicationDetail = $scope.patient.medications[index];
		$scope.showThis = true;
		//console.log($scope.patient.medicationDetail);
		
	}
}
function NotesCtrl($rootScope, $scope){
	$scope.patients = $rootScope.patients;
	$scope.patient = $rootScope.patient;
	$scope.showThis = false;	
	
	
	$scope.view = function(index){
		$scope.patient.noteDetail = $scope.patient.notes[index];
		$scope.showThis = true;
		console.log($scope.patient.noteDetail);
		
	}
}

function ImagingCtrl($rootScope,$stateParams,$scope,$http,$state,$q,jsonServices){
	$scope.showThis = false;
	
	$q.when(jsonServices.imaging().then(function(d){
		$rootScope.imaging = d.data;
	})).then(function(){
		$scope.imaging = $rootScope.imaging;
	});
	
	$scope.view = function(index){
		$scope.imaging = $scope.imaging[index];
		$scope.showThis = true;
	}
}


angular
    .module('mainApp')       
    .controller('MainCtrl', MainCtrl)       
    .controller('HeaderCtrl', HeaderCtrl)	
	.controller('SearchCtrl', SearchCtrl)		
	.controller('SearchResultsCtrl', SearchResultsCtrl)			
	.controller('MailCtrl', MailCtrl)	
	.controller('DateTimeCtrl', DateTimeCtrl)
	.controller('DemographicsCtrl', DemographicsCtrl)
	.controller('LabsCtrl', LabsCtrl)
	.controller('VitalsCtrl', VitalsCtrl)
	.controller('AllergiesCtrl', AllergiesCtrl)
	.controller('MedicationsCtrl', MedicationsCtrl)
	.controller('NotesCtrl', NotesCtrl)
	.controller('ImagingCtrl', ImagingCtrl)
	;
	
	
