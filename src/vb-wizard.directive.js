(function() {
	'use strict';
	
	angular.module('vb-wizard')
		.directive('vbWizard', vbWizard);

	function vbWizard() {
		function link() {

		}
		return {
			link: link,
			template: 'Hello Directive'
		}
	}

})();