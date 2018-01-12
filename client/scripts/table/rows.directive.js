(function() {
  'use strict';

  angular.module('ape.table')
    .directive('apeTableRows', apeTableRows);

  // directive definition
  function apeTableRows() {
    var directive = {
      templateUrl: 'scripts/table/rows.template.html',
      scope: {
        searchterm: '=',
        table: '=',
        detailTable: '@'
      },
      controller: apeTableRowsTableRowsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeTableRows

  // directive controller
  function apeTableRowsTableRowsController(Interface) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.searchterm = '';

    // methods
    vm.$onInit = initialize;
    vm.details = details;

    // functions
    function initialize() {
    }

    function details(entryId) {
      /* Goes to the details page for a selected entry. If this table was invoked
      as part of a list view, it will default to going to the details page for
      whatever module that list was in. If a detailTable was specified, however,
      as is done in related tables inside another details view, then it will go to
      that module's detail view */

      var parameters = {id_num: entryId};
      var toState = null;
      var subState = '.details';
      // If a detail table for a related table was specified, go there
      if (vm.detailTable !== '') {
        toState = vm.detailTable + subState;
      }
      // Otherwise, (in case of a list table), go to the details page of this module
      else {
        toState = '^' + subState;
      }
      Interface.go(toState, parameters);
    }
  } // apeTableRowsTableRowsController
})();
