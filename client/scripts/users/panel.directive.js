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
  function apeUserPanelController($filter, UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.titleMessage = null;
    vm.closeButtonCaption = null;

    /* Methods */
    vm.$onInit = initialize;
    vm.openPanel = openPanel;

    /* Functions */
    function initialize() {
      vm.titleMessage = $filter('translate')('users.panel.directive.titleMessage');
      vm.closeButtonCaption = $filter('translate')('users.panel.directive.closeButtonCaption');
    }

    function openPanel() {
      UserPanel.open = !UserPanel.open;
    }
  }
  /*close apeUserPanelController*/

})();
