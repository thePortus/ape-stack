(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.app')
    .factory('UserPanel', userPanel);

  function userPanel() {
    return new UserPanel();

    function UserPanel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */
      vm.open =  false;

      /* Methods */

    }
    /*close UserPanel*/

  }
  /*close userPanel*/

})();
