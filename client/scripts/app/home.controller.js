(function() {
  'use strict';

  angular.module('ape.app')
    .controller('HomeController', homeController);

  function homeController(UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    vm.panel = UserPanel;
  } // homeController
})();
