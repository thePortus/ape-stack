(function() {
  'use strict';


  angular.module('ape.utils')
    .factory('Paths', pathsFactory);

    /*Factory function definition, put Angular services here*/
    function pathsFactory($http, $location, API_ROUTE, API_VERSION) {
      return new Paths();

      function Paths() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.base = $location.protocol() + '://' + $location.host();
        vm.api = $location.protocol() + '://' + $location.host() + '/' + API_ROUTE + '/' + API_VERSION;

        /* Methods */


        /*Functions*/


    }
    /*close Path*/

}
/*close pathsFactory*/

})();
