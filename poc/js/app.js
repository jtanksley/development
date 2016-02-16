/**
	Main App Module.
 *
 */
(function () {
	
    angular.module('mainApp', [		
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',					// Ui Bootstrap
		'angucomplete',
		'ui.select',
		'datatables',
		'ngSanitize'
    ])
})();

