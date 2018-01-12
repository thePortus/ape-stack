(function() {
  'use strict';

  angular.module('ape.auth')
    .directive('apeLogin', apeLogin);

  // directive definition
  function apeLogin() {
    var directive = {
      templateUrl: 'scripts/auth/login.template.html',
      scope: {
      },
      controller: apeLoginController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeLogin

  // directive controller
  function apeLoginController(Auth, Interface) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.credentials = {
      username: '',
      password: ''
    };
    vm.errors = [];

    // methods
    vm.$onInit = initialize;
    vm.login = login;

    // functions
    function initialize() {
    }

    function login(username, password) {
      Auth.login(username, password, successCB, failureCB);
      Interface.go('home');

      function successCB(responseData) {
        Interface.go('home');
      }

      function failureCB(errors) {
        vm.errors = errors;
      }
    }
  } // apeLoginController
})();
