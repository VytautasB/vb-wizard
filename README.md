# vb-wizard
WizardBar component for AngularJS

Usage:

```html
<div vb-wizard-bar
      steps="steps"
      current="current" 
      step-click="stepClick"
      step-disabled="stepDisabled">
</div>
```

Controller:

```javascript
angular.module('DemoApp')
  .controller('Demo', function($scope) {
    $scope.steps = [
      'Step 1',
      'Step 2',
      'Disabled Step'
    ];
			
    $scope.current = 2;

    $scope.stepClick = function(index) {
      $scope.current = index;
    }

    $scope.stepDisabled = function(index) {
      return index > 1; // disable steps 2 and the ones after it
    }
  });
```
