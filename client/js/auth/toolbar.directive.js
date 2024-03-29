(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.auth')
    .directive('apeUserStatus', apeUserStatus);

  /*Directive Definition*/
  function apeUserStatus() {
    var directive = {
      templateUrl: 'js/auth/toolbar.template.html',
      scope: {},
      controller: apeUserStatusController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeUserStatusController(Auth, Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.auth = Auth;

    /* Methods */
    vm.$onInit = initialize;
    vm.Interface = Interface;
    vm.login = login;
    vm.logout = logout;
    vm.register = register;
    vm.openAccount = openAccount;
    vm.openUserList = openUserList;

    /* Functions */
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
  }
  /*close apeUserStatusController*/

})();
