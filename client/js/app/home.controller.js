(function() {
  'use strict';

  angular.module('ape.app')
    .controller('HomeCtrl', homeCtrl);

  function homeCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.message = 'Welcome to APE (Angular, Postgres, Express, Node).';

  }

})();
