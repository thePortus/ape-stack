/* js/details/details.factory.js

This factory is initiated by a specific entry within a datatable, which sends it a datafactory
loaded with data related to a single entry within that table. This factory interprets the data factory
into information loaded into the details directive common to all tables.

*/
(function() {
  'use strict';

  angular.module('ape.details')
    .factory('Details', detailsFactory);

  function detailsFactory() {
    return detailsCall;

    function detailsCall(id_num, datafactory) {
      return new Details(id_num, datafactory);

      function Details(id_num, datafactory) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.id_num = id_num;
        vm.from_table = datafactory;
        vm.title_field = datafactory.table_name;
        vm.data = {};

        /* Methods */
        vm.initialize = initialize;

        /* Initialization Call */
        vm.initialize();

        /* Method Functions */
        function initialize() {
          // Get the information on the table itself
          datafactory.get(initializationCallBack);

          function initializationCallBack(responseData) {
            vm.data = responseData;
          }
        }
        /* close initialize */

      }
      /*close Details*/

    }
    /* close detailsCall */

  }
  /*close detailsFactory*/

})();
