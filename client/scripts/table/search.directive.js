(function() {
  'use strict';

  angular.module('ape.table')
    .directive('apeTableSearch', apeTableSearch);

  // directive definition
  function apeTableSearch() {
    var directive = {
      templateUrl: 'scripts/table/search.template.html',
      scope: {
        searchterm: '=',
        table: '='
      },
      controller: apeTableSearchController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeTableSearch

  // directive controller
  function apeTableSearchController() {
    /* jshint validthis: true */
    var vm = this;

    // properties

    // methods
    vm.$onInit = initialize;
    vm.sortField = sortField;

    // functions
    function initialize() {
    }

    function sortField(fieldName) {
      if (vm.table.sorting.field === fieldName) {
        vm.table.sorting.reverse = !vm.table.sorting.reverse;
      }
      else {
        vm.table.sorting.field = fieldName;
        vm.table.sorting.reverse = false;
      }
    }
  } //  apeTableSearchController
})();
