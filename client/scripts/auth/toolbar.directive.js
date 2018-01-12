(function() {
  'use strict';

  angular.module('ape.auth')
    .directive('apeUserStatus', apeUserStatus);

  // directive definition
  function apeUserStatus() {
    var directive = {
      templateUrl: 'scripts/auth/toolbar.template.html',
      scope: {},
      controller: apeUserStatusController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeUserStatus

  // directive controller
  function apeUserStatusController(Auth, Interface) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.auth = Auth;

    // methods
    vm.$onInit = initialize;
    vm.Interface = Interface;
    vm.login = login;
    vm.logout = logout;
    vm.register = register;
    vm.openAccount = openAccount;
    vm.openUserList = openUserList;

    // functions
    function initialize() {
    }

    function login() {
      Interface.go('login');
    }

    function logout() {
      Auth.logout();
      Interface.go('home');
    }

    function register() {
      Interface.go('registration');
    }

    function openAccount() {
      Interface.go('account');
    }

    function openUserList() {
      Interface.go('userlist');
    }
  } // apeUserStatusController
})();
