(function() {
  'use strict';

  angular.module('ape.users')
    .directive('apeUserPanel', apeUserPanel);

  // directive definition
  function apeUserPanel() {
    var directive = {
      templateUrl: 'scripts/users/panel.template.html',
      controller: apeUserPanelController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeUserPanel

  // directive controller
  function apeUserPanelController($filter, UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.titleMessage = null;
    vm.closeButtonCaption = null;

    // methods
    vm.$onInit = initialize;
    vm.openPanel = openPanel;

    // functions
    function initialize() {
      vm.titleMessage = $filter('translate')('users.panel.directive.titleMessage');
      vm.closeButtonCaption = $filter('translate')('users.panel.directive.closeButtonCaption');
    } // initialize

    function openPanel() {
      UserPanel.open = !UserPanel.open;
    } // openPanel
  } // apeUserPanelController
})();
