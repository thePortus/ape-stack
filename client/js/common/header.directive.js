(function() {
  'use strict';

  angular.module('ape.common')
    .directive('apeHeader', apeHeader);

  /*Directive Definition*/
  function apeHeader() {
    var directive = {
      templateUrl: 'js/common/header.template.html',
      scope: {
        style: '=',
        content: '='
      },
      controller: apeHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeHeaderController() {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.details = null;

    /* Methods */
    vm.$onInit = initialize;

    /* Method Functions */
    function initialize() {
    }

  }
  /*close eleusisHeaderController*/

})();
