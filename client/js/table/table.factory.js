/* js/table/table.factory.js

This factory is initiated by a specific data tale which sends it a datafactory
loaded with data related to that table. This factory interprets the data factory
into information loaded into the details directive common to all tables.

*/
(function() {
  'use strict';

  angular.module('ape.table')
    .factory('Table', tableFactory);

  function tableFactory() {
    return tableCall;

    function tableCall(datafactory) {
      return new Table(datafactory);

      function Table() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.table_name = datafactory.table_name;
        vm.id_field = datafactory.id_field;
        vm.title_field = datafactory.title_field;
        vm.fields = datafactory.fields;
        vm.sorting = {
          'field': datafactory.id_field.value,
          'reverse': false
        };
        vm.data = null;

        /* Methods */
        vm.initialize = initialize;

        /* Initialization Call */
        vm.initialize();

        /* Method Functions */
        function initialize() {
          datafactory.get(initializationCallBack);

          function initializationCallBack(responseData) {
            vm.data = responseData;
          }
        }
        /* close initialize */

      }
      /*close Table*/

    }
    /* close tableCall */

  }
  /*close tableFactory*/

})();
