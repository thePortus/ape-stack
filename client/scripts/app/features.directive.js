(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.app')
    .directive('apeFeatures', apeFeatures);

  /*Directive Definition*/
  function apeFeatures() {
    var directive = {
      templateUrl: 'scripts/app/features.template.html',
      scope: {},
      controller: apeFeaturesController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeFeaturesController(AppFeatures) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.message = 'Welcome to Ape-Stack, powered by the following technologies...';
    vm.features = AppFeatures.features;

  }
  /*close apeFeaturesController*/

})();
