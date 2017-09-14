(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.users')
    .directive('apeProfile', apeProfile);

  /*Directive Definition*/
  function apeProfile() {
    var directive = {
      templateUrl: 'js/users/profile.template.html',
      scope: {},
      controller: apeProfileController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeProfileController(Auth, Users) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.profile = null;
    vm.profileData = null;

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize() {
      if (Auth.jsonWebToken) {
        vm.profile = Users.get(Auth.userData.id, initCB);
      }
      function initCB(responseData) {
        vm.profileData = responseData;
      }
    }
  }
  /*close apeProfileController*/

})();
