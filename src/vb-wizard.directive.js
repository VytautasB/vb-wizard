(function() {
	'use strict';
	
	angular.module('vb-wizard')
		.directive('vbWizardBar', [function() {
			function link(scope, element, attrs) {
				scope.getClass = function($index) {
					if (scope.current > $index) {
						return 'step-done';
					} else if (scope.current === $index) {
						return 'step-current';
					}
				}

				scope.internalClick = function($index) {
					if (!scope.stepClick || (scope.stepDisabled && scope.stepDisabled($index))) {
						return;
					}

					scope.stepClick($index);
				}

				scope.$watchCollection(function() {
					return scope.steps.map(function(step, index) {
						return scope.stepDisabled && scope.stepDisabled(index);
					});
				}, function(values) {
					if (!values) return;

					var ballButtons = element[0].querySelectorAll('.ball');
					values.forEach(function(value, index) {
						var btn = angular.element(ballButtons[index]);
						if (!value) {
							btn.removeAttr('disabled');
						} else {
							btn.attr('disabled', 'disabled');
						}
					});
				});
			}

			return {
				scope: {
					steps: '=',
					current: '=',
					stepClick: '=',
					stepDisabled: '='
				},
				link: link,
				templateUrl: 'vb-wizard.template.html'
			}
		}])

})();