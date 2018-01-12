(function() {
  'use strict';

  angular.module('ape.app')
    .directive('apeFeatures', apeFeatures);

  // directive definition
  function apeFeatures() {
    var directive = {
      templateUrl: 'scripts/app/features.template.html',
      scope: {},
      controller: apeFeaturesController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeFeatures

  // directive controller
  function apeFeaturesController(AppFeatures) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.message = 'Welcome to Ape-Stack, powered by the following technologies...';
    vm.features = AppFeatures.features;
  } // apeFeaturesController
})();
