(function() {
  'use strict';

  angular.module('ape.auth')
    .directive('apeLogin', apeLogin);

  /*Directive Definition*/
  function apeLogin() {
    var directive = {
      templateUrl: 'js/auth/login.template.html',
      scope: {
      },
      controller: apeLoginController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeLoginController(Auth, Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.credentials = {
      username: '',
      password: ''
    };
    vm.errors = [];

    /* Methods */
    vm.$onInit = initialize;
    vm.login = login;

    /* Method Functions */
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

  }
  /*close apeLoginController*/

})();
