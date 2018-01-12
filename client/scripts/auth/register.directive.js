(function() {
  'use strict';

  angular.module('ape.auth')
    .directive('apeRegister', apeRegister);

  // directive definition
  function apeRegister() {
    var directive = {
      templateUrl: 'scripts/auth/register.template.html',
      scope: {},
      controller: apeRegisterController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeRegister

  // directive controller
  function apeRegisterController(Auth, Users, Interface) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.form = {
      username: null,
      password: null,
      password2: null,
      email: null,
      firstName: null,
      lastName: null,
      about: null
    };
    vm.errors = [];

    // methods
    vm.$onInit = initialize;
    vm.register = register;

    // functions
    function initialize() {
    }

    function register() {
      Users.create(vm.form, registerSuccessCB, registerFailureCB);

      function registerSuccessCB(responseData) {
        Auth.login(responseData.username, responseData.password, postLoginCB, postLoginCB);

        function postLoginCB() {
          Interface.go('home');
        }
      }

      function registerFailureCB(responseData) {
        for (var x = 0; x < responseData.data.errors.length; x += 1) {
          var error = responseData.data.errors[x];
          vm.errors.push(error.message);
        }
      }
    }
  } // apeRegisterController
})();
