(function() {
  'use strict';

  // Main Controller Definition
  angular.module('ape.app')
    .controller('MainController', mainController);

  function mainController() {
    /* jshint validthis: true */
    var vm = this;

    // Properties

    // Methods
    vm.initialize = initialize;

    // Initialization call
    vm.initialize();

    function initialize() {
    } // initialize
  } // mainController
})();
