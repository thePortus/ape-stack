(function() {
  'use strict';

  angular.module('ape.details')
    .directive('apeDetails', apeDetails);

  // directive definition
  function apeDetails() {
    var directive = {
      templateUrl: 'scripts/details/details.template.html',
      scope: {
        parameters: '=',
        datafactory: '='
      },
      controller: apeDetailsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeDetails

  // directive controller
  function apeDetailsController(Details) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.details = null;

    // methods
    vm.$onInit = initialize;

    // functions
    function initialize() {
      vm.details = new Details(vm.parameters.id_num, vm.datafactory);
      vm.fields = vm.details.from_table.fields;
      vm.data = vm.details.data;
    }
  } // apeDetailsController
})();
