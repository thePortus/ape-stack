(function() {
  'use strict';

  angular.module('ape.table')
    .directive('apeTable', apeTable);

  // directive definition
  function apeTable() {
    var directive = {
      templateUrl: 'scripts/table/table.template.html',
      scope: {
        allowOptions: '=',
        datafactory: '=',
        detailTable: '@',
        style: '@'
      },
      controller: apeTableController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeTable

  // directive controller
  function apeTableController(Table) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.dropdown = false;
    vm.showDropdown = false;
    vm.disableOptions = true;
    vm.showOptions = false;
    vm.table = null;
    vm.searchterm = '';

    // methods
    vm.$onInit = initialize;
    vm.clickOptions = clickOptions;

    // functions
    function initialize() {
      if (typeof vm.allowOptions !== 'undefined' && vm.allowOptions !== false) {
        vm.disableOptions = false;
      }
      vm.table = new Table(vm.datafactory);
      if (vm.style === 'dropdown') {
        vm.dropdown = true;
      }
      else {
        vm.dropdown = false;
      }
    }

    function clickOptions() {
      vm.showOptions = !vm.showOptions;
    }
  } // apeTableController
})();
