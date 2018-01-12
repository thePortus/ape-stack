(function() {
  'use strict';

  angular.module('ape.common')
    .directive('apeHeader', apeHeader);

  // directive definition
  function apeHeader() {
    var directive = {
      templateUrl: 'scripts/common/header.template.html',
      scope: {
        style: '=',
        content: '='
      },
      controller: apeHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeHeader

  // directive controller
  function apeHeaderController() {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.details = null;

    // methods
    vm.$onInit = initialize;

    // functions
    function initialize() {
    }
  } // apeHeaderController
})();
