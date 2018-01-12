(function() {
  'use strict';

  angular.module('ape.app')
    .factory('UserPanel', userPanel);

  function userPanel() {
    return new UserPanel();

    function UserPanel() {
      /* jshint validthis: true */
      var vm = this;

      // properties
      vm.isOpen = false;
    } // UserPanel
  } // userPanel
})();
