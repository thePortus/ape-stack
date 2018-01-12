(function() {
  'use strict';

  angular.module('ape.app')
    .directive('apeSiteHeader', apeSiteHeader);

  // directive definition
  function apeSiteHeader() {
    var directive = {
      templateUrl: 'scripts/app/header.template.html',
      scope: {},
      controller: apeSiteHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeSiteHeader

  // directive controller
  function apeSiteHeaderController(APP_TITLE, APP_VERSION, APP_CREDITS, APP_RIGHTS, Interface, UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.app_title = APP_TITLE;
    vm.app_version = APP_VERSION;
    vm.app_credits = APP_CREDITS;
    vm.app_rights = APP_RIGHTS;
    vm.menuItems = [
      {'label': 'Home', 'value': 'home'}
    ];

    // methods
    vm.openMenu = openMenu;
    vm.openPanel = openPanel;
    vm.go = go;

    // functions
    function openMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    } // openMenu

    function openPanel() {
      UserPanel.isOpen = !UserPanel.isOpen;
    } // openPanel

    function go(toState) {
      Interface.go(toState);
    } // go
  } // eleusisHeaderController
})();
