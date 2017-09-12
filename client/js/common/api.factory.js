(function() {
  'use strict';


  angular.module('ape.app')
    .factory('Api', apiFactory);

    /*Table factory function definition*/
    function apiFactory($http, Auth) {
      return apiCall;

    function apiCall(item_type, item_id, item_subtable) {
      return new API(item_type, item_id, item_subtable);

      function API(item_type, item_id, item_subtable) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.item_type = item_type;
        vm.item_id = null;
        vm.item_subtable = null;
        vm.info = null;

        /* Methods */
        vm.initialize = initialize;
        vm.makeCall = makeCall;
        vm.get = get;
        vm.post = post;
        vm.update = update;
        vm.destroy = destroy;
        /* Initialization Call */
        vm.initialize();

        /*Functions*/
        function initialize() {
          if(typeof item_id !== 'undefined') {
            vm.item_id = item_id;
          }
          if(typeof item_subtable !== 'undefined') {
            vm.item_subtable = item_subtable;
          }
        }
        /* close initialize */

        function makeCall(options, callBack) {
          var path = '/api/' + vm.item_type + '/';
          if(vm.item_id !== null) {
            path += vm.item_id;
          }
          if(vm.item_subtable !== null) {
            path += '/' + vm.item_subtable;
          }
          if(typeof(options.data) === 'undefined') {
            options.data = {};
          }

          if(Auth.jsonWebToken) {
            $http({
              method: options.method,
              url: path,
              headers: {
               'Authorization': Auth.jsonWebToken
             },
              data: options.data
            })
              // Retrieving data
              .then(get_info_complete)
              // Handling errors
              .catch(get_info_error);
          }
          else{
            $http({
              method: options.method,
              url: path
            })
              // Retrieving data
              .then(get_info_complete)
              // Handling errors
              .catch(get_info_error);
          }
            function get_info_complete(response) {
              callBack(response.data);
            }
            /* close get_info_complete */

            function get_info_error(error) {
              if(typeof error.data !== 'undefined') {
                console.log('Error:' + error.status);
                console.log(error.data);
              }
            }
            /* close get_info_error */
        }
        /* close makeCall */

        function get(callBack) {
          vm.makeCall({
            'method': 'GET'
          }, callBack);
        }
        /* close get */

        function post(userData, callBack) {
          vm.makeCall({
            'method': 'POST',
            'data': userData
          }, callBack);
        }
        /* close post */

        function update(userData, callBack) {
          vm.makeCall({
            'method': 'UPDATE',
            'data': userData
          }, callBack);
        }
        /* close update*/

        function destroy(callBack) {
          vm.makeCall({
            'method': 'DELETE',
          }, callBack);
        }
        /*close destroy */
    }
    /*close API*/

  }
  /*close apiCall*/

}
/*close apiFactory*/

})();
