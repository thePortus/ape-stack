(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.users')
    .directive('apeUserPanel', apeUserPanel);

  /*Directive Definition*/
  function apeUserPanel() {
    var directive = {
      templateUrl: 'js/users/panel.template.html',
      controller: apeUserPanelController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeUserPanelController(UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.panel = UserPanel;

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize() {

    }
  }
  /*close apeUserPanelController*/

})();
