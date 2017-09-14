(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.users')
    .directive('apeRegister', apeRegister);

  /*Directive Definition*/
  function apeRegister() {
    var directive = {
      templateUrl: 'js/users/register.template.html',
      scope: {},
      controller: apeRegisterController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeRegisterController(Auth, Users, Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
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

    /* Methods */
    vm.$onInit = initialize;
    vm.register = register;

    /* Functions */
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
        for(var x = 0; x < responseData.data.errors.length; x += 1) {
          var error = responseData.data.errors[x];
          vm.errors.push(error.message);
        }
      }
    }

  }
  /*close apeProfileController*/

})();
