(function() {
  'use strict';

  angular.module('ape.users')
    .directive('apeProfile', apeProfile);

  // directive definition
  function apeProfile() {
    var directive = {
      templateUrl: 'scripts/users/profile.template.html',
      scope: {},
      controller: apeProfileController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeProfile

  // directive controller
  function apeProfileController(Auth, Users) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.gridOptions = null;
    vm.profile = null;
    vm.profileData = null;

    // methods
    vm.$onInit = initialize;

    // functions
    function initialize() {
      vm.gridOptions = {
        enableSorting: true,
        fastWatch: true,
        columnDefs: [],
        data: []
      };

      if (Auth.jsonWebToken) {
        vm.profile = Users.get(Auth.userData.id, initCB);
      }
      function initCB(responseData) {
        vm.profileData = responseData;
        vm.gridOptions.data = vm.profileData;
      } // initCB
    } // initialize
  } // apeProfileController
})();
