(function() {
  'use strict';

  angular.module('ape.users')
    .directive('apeUserList', apeUserList);

  // directive definition
  function apeUserList() {
    var directive = {
      templateUrl: 'scripts/users/list.template.html',
      scope: {},
      controller: apeUserListController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeUserList

  // directive controller
  function apeUserListController(Users) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.list = null;

    // methods
    vm.$onInit = initialize;

    // functions
    function initialize() {
      Users.get(initCB);

      function initCB(responseData) {
        vm.list = responseData;
      } // initCB
    } // initialize
  } // apeUserStatusController
})();
