(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.users')
    .directive('apeUserList', apeUserList);

  /*Directive Definition*/
  function apeUserList() {
    var directive = {
      templateUrl: 'js/users/list.template.html',
      scope: {},
      controller: apeUserListController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeUserListController(Users) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.list = null;

    /* Methods */
    vm.$onInit = initialize;


    /* Functions */
    function initialize() {
      Users.get(initCB);

      function initCB(responseData) {
        vm.list = responseData;
      }
    }
  }
  /*close apeUserStatusController*/

})();
