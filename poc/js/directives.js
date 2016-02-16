/**
 * Directives
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'CGM webEHR | Main Example';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'CGM webEHR | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll($timeout){
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: scope.boxHeight,
                    railOpacity: 0.9
                });

            });
        }
    };
}
function breadCrumbs(){
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/common/breadcrumbs.html'
	}
}
function vitalsForm(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/form_vitals.html'
	}
}

function vitalsList(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/vitals_list.html'
	}
}

function vitalsDetail(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/vitals_detail.html'
	}
}

function vitalsChart(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/chart_vitals.html'
	}
}

function allergiesList(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/allergies_list.html'
	}
}

function allergiesDetail(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/allergies_detail.html'
	}
}

function medicationsList(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/medications_list.html'
	}
}

function medicationsDetail(){
	return{
		restrict:'AE',
		replace: true,
		templateUrl: 'views/medications_detail.html'
	}
}

function patientList(){	
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/patient_list.html'
	};
}
function labList(){	
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/lab_list.html'
	};
}
function patientNavigation(){	
	return{
		restrict: 'AE',		
		templateUrl: 'views/patient_navigation.html'
	};
}

function patientDetail(){	
	return{			
		restrict: 'AE',			
		templateUrl: 'views/patient_detail.html'
	};
}
function labDetail(){	
	return{			
		restrict: 'AE',			
		templateUrl: 'views/lab_detail.html'
	};
}

function noteList(){	
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/note_list.html'
	};
}

function noteDetail(){	
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/note_detail.html'
	};
}

function dateTimey(){
	return{
		restrict: 'A',
		require: 'ngModel',
		link: function(scope,element,attrs, ngModelCtrl){
			element.datetimepicker({
				dateFormat: 'MM/DD/YYYY',
				language: 'en',
				pickTime: false,
				startDate: '01/01/1970',
				endDate: '12/31/2065'
			}).on('changeDate',function(e){
				ngModelCtrl.$setViewValue(e.date);
				scope.$apply();
			});
		}
	}
}
function allergiesForm($document){
	"use strict";
	return function (scope, element) {
		var startX = 0,
		  startY = 0,
		  x = 0,
		  y = 0;
		 element= angular.element(document.getElementsByClassName("modal-dialog"));
		 console.log("added directive");
		element.css({
		  position: 'fixed',
		  cursor: 'move'
		});
		element.draggable();
		
		element.on('mousedown', function (event) {
		  // Prevent default dragging of selected content
		  event.preventDefault();
		  startX = event.screenX - x;
		  startY = event.screenY - y;
		  $document.on('mousemove', mousemove);
		  $document.on('mouseup', mouseup);
		});

		function mousemove(event) {
		  y = event.screenY - startY;
		  x = event.screenX - startX;
		  element.css({
			top: y + 'px',
			left: x + 'px'
		  });
		}

		function mouseup() {
		  $document.unbind('mousemove', mousemove);
		  $document.unbind('mouseup', mouseup);
		}
	}
}
function allergiesButtons(){
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/button_panel_allergies.html'
	};
}

function noAllergiesButtons(){
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/button_panel_no_allergies.html'
	};
}

function hideAllergiesList(){
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: 'views/button_panel_no_allergies.html'
	};
}

function autoComplete(){
	
    return function(scope, iElement, iAttrs) {
		iElement.autocomplete({
			source: scope[iAttrs.uiItems],
			select: function() {
				$timeout(function() {
				  iElement.trigger('input');
				}, 0);
			}
		});
    };
}
/**
 *
 * Pass all functions into module
 */
angular
    .module('mainApp')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('breadCrumbs', breadCrumbs)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)   
    .directive('vitalsForm', vitalsForm)
    .directive('vitalsList', vitalsList)
    .directive('vitalsChart', vitalsChart)
    .directive('vitalsDetail', vitalsDetail)
    .directive('patientList', patientList)
    .directive('labList', labList)
    .directive('patientNavigation', patientNavigation)
	.directive('fullScroll', fullScroll)
	.directive('slimScroll', slimScroll)
    .directive('patientDetail', patientDetail)      
    .directive('labDetail', labDetail)      
    .directive('allergiesList', allergiesList)      
    .directive('allergiesDetail', allergiesDetail)      
    .directive('dateTimey', dateTimey)
    .directive('medicationsList', medicationsList)
    .directive('medicationsDetail', medicationsDetail)
    .directive('noteList', noteList)
    .directive('noteDetail', noteDetail)
    .directive('allergiesForm', allergiesForm)
    .directive('allergiesButtons', allergiesButtons)
    .directive('noAllergiesButtons', noAllergiesButtons)
    .directive('autoComplete', autoComplete)
	
	;
    
