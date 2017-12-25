(function() {
  'use strict';

  angular.module('ape.app')
    .controller('HomeCtrl', homeCtrl);

  function homeCtrl(UserPanel) {
    /* jshint validthis: true */
    var vm = this;

    vm.panel = UserPanel;
  }

})();
