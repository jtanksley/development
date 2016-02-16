/**
   Using AngularUI Router to manage routing and views
 * Each view is defined as state.
 * Initially there are written states for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html"
        })	        
		.state('index.main', {
            url: "/main",
            templateUrl: "views/home.html",
            data: { pageTitle: 'Home' }			
        })		
		.state('index.search', {
            url: "/main/patients",
			controller: 'SearchResultsCtrl',
            templateUrl: "views/patient_search.html",			
            data: { pageTitle: 'Patient Search' }			
        })	
		.state('index.chart', {
			url: "/main/chart",
			templateUrl: "views/project_detail.html",
			params: {patient: null},
			data: { pageTitle: 'Chart Summary' }		
		})		
		.state('index.imaging', {
            url: "/main/imaging",
            templateUrl: "views/imaging.html",
            data: { pageTitle: 'Imaging' }			
        })
		.state('index.labs', {
            url: "/main/labs",
            templateUrl: "views/labs_review.html",
            data: { pageTitle: 'Labs' }			
        })
		.state('index.encounters', {
            url: "/main/labs",
            templateUrl: "views/encounters.html",
            data: { pageTitle: 'Encounters' }			
        })		
		.state('index.demographics', {
            url: "/main/demographics",
            templateUrl: "views/demographics.html",
			params: {patient: null},
			controller: 'DemographicsCtrl',
            data: { pageTitle: 'Patient Demographics' }
        })
        .state('index.schedule', {
            url: "/main/schedule",
            templateUrl: "views/calendar.html",
            data: { pageTitle: 'Calendar' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
                        },
                        {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        }
                    ]);
                }
            }
        })
		.state('mailbox', {
            abstract: true,
            url: "/mailbox",
            templateUrl: "views/common/content.html",
			
        })
		.state('mailbox.inbox', {
            url: "/mailbox",
            templateUrl: "views/mailbox.html",
            controller: 'MailCtrl',
            data: { pageTitle: 'Mail Inbox' },
			params: {message: null},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
			 }
        })
		 .state('mailbox.email_view', {
            url: "mailbox/email_view",
            templateUrl: "views/mail_detail.html",
			controller: 'MailCtrl',
			params: {message:null},
            data: { pageTitle: 'Mail detail' }
        })
		.state('mailbox.email_compose', {
            url: "/email_compose",
            templateUrl: "views/mail_compose.html",
			controller: 'MailCtrl',
            data: { pageTitle: 'Mail compose' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        }
                    ]);
                }
            }
        })	
		.state('patients', {
            abstract: true,
            url: "/patients",			
            templateUrl: "views/common/content.html",
			
        })
		.state('patients.patients', {
            url: "/patients/main",
            templateUrl: "views/clients.html",
			params: {scope: null},
            data: { pageTitle: 'Patient Search' }			
        })
		.state('patients.chart', {
            url: "/patients/chart",
            templateUrl: "views/project_detail.html",
			params: {patient: null},
            data: { pageTitle: 'Chart Summary' }		
        })
		.state('patients.vitals', {
            url: "/patients/vitals",
            templateUrl: "views/vitals.html",
			params: {patient: null},
            data: { pageTitle: 'Chart Summary' }		
        })
		.state('patients.history', {
            url: "/patients/history",
            templateUrl: "views/patient_history.html",
			params: {patient: null},
            data: { pageTitle: 'History' }		
        })
		.state('patients.medications', {
            url: "/patients/medications",
            templateUrl: "views/patient_medications.html",
			params: {patient: null},
            data: { pageTitle: 'Medications' }		
        })
		.state('patients.allergies', {
            url: "/patients/allergies",
            templateUrl: "views/patient_allergies.html",
			params: {patient: null},
            data: { pageTitle: 'Allergies' }		
        })
		.state('patients.notes', {
            url: "/patients/notes",
            templateUrl: "views/patient_notes.html",
			params: {patient: null},
            data: { pageTitle: 'Notes' }		
        })
		.state('patients.labs', {
            url: "/patients/labs",
            templateUrl: "views/form_basic.html",
			params: {patient: null},
            data: { pageTitle: 'Labs' }		
        })
		.state('patients.procedures', {
            url: "/patients/procedures",
            templateUrl: "views/patient_procedures.html",
			params: {patient: null},
            data: { pageTitle: 'Procedures' }		
        })
		.state('patients.radiology', {
            url: "/patients/radiology",
            templateUrl: "views/patient_radiology.html",
			params: {patient: null},
            data: { pageTitle: 'Radiology' }		
        })		
}
run.$inject = ['$rootScope', '$state', '$http','$filter','$stateParams','jsonServices','$q'];
function run($rootScope, $state, $http,$filter,$stateParams,jsonServices,$q){
	//setup some constants.
	$rootScope.stateParams = $stateParams;
	$rootScope.keywords = '';
	$rootScope.searchResults = {};
	$rootScope.previousState;
	$rootScope.currentState;
	$rootScope.labs = {};
	$rootScope.messages = {};
	$rootScope.$on('$stateChangeSuccess', function(event,to,toParams, from,fromParams){
			$rootScope.previousState = from.name;
			$rootScope.currentState = to.name;			
		});
	$rootScope.patients = {};
	$rootScope.patient = {};
	$rootScope.reverse = true;	
	$q.when(jsonServices.patients().then(function(d){
		$rootScope.patients = d.data;
	})).then(function(){
		$rootScope.patients = $filter('orderBy')($rootScope.patients, 'lastViewed', $rootScope.reverse);
	});
}
angular
    .module('mainApp')	
    .config(config)
    .run(run);

		
