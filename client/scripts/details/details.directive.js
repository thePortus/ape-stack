(function() {
  'use strict';

  angular.module('ape.details')
    .directive('apeDetails', apeDetails);

  /*Directive Definition*/
  function apeDetails() {
    var directive = {
      templateUrl: 'js/details/details.template.html',
      scope: {
        parameters: '=',
        datafactory: '='
      },
      controller: apeDetailsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeDetailsController(Details) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.details = null;

    /* Methods */
    vm.$onInit = initialize;

    /* Method Functions */
    function initialize() {
      vm.details = new Details(vm.parameters.id_num, vm.datafactory);
      vm.fields = vm.details.from_table.fields;
      vm.data = vm.details.data;
    }

  }
  /*close apeDetailsController*/

})();
