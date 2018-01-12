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

    function detailsCall(idNum, datafactory) {
      return new Details(idNum, datafactory);

      function Details(idNum, datafactory) {
        /* jshint validthis: true */
        var vm = this;

        // properties
        vm.id_num = idNum;
        vm.from_table = datafactory;
        vm.title_field = datafactory.table_name;
        vm.data = {};

        // methods
        vm.initialize = initialize;

        /* Initialization Call */
        vm.initialize();

        // functions
        function initialize() {
          // Get the information on the table itself
          datafactory.get(initializationCallBack);

          function initializationCallBack(responseData) {
            vm.data = responseData;
          }
        } // initialize
      } //  Details
    } //  detailsCall
  } // detailsFactory
})();
