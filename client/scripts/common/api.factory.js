(function() {
  'use strict';

  angular.module('ape.app')
    .factory('Api', apiFactory);

  function apiFactory($http, $location, Auth, Paths) {
    return apiCall;

    function apiCall(itemType, itemId, itemSubtable) {
      return new API(itemType, itemId, itemSubtable);

      function API(itemType, itemId, itemSubtable) {
        /* jshint validthis: true */
        var vm = this;

        // properties
        vm.item_type = itemType;
        vm.item_id = null;
        vm.item_subtable = null;
        vm.info = null;

        // methods
        vm.initialize = initialize;
        vm.makeCall = makeCall;
        vm.get = get;
        vm.post = post;
        vm.update = update;
        vm.destroy = destroy;
        /* Initialization Call */
        vm.initialize();

        // functions
        function initialize() {
          if (typeof itemId !== 'undefined') {
            vm.item_id = itemId;
          }
          if (typeof itemSubtable !== 'undefined') {
            vm.item_subtable = itemSubtable;
          }
        }
        // initialize */

        function makeCall(options, callBackSuccess, callBackFailure) {
          var path = Paths.api + vm.item_type + '/';
          if (vm.item_id !== null) {
            path += vm.item_id;
          }
          if (vm.item_subtable !== null) {
            path += '/' + vm.item_subtable;
          }
          if (typeof (options.data) === 'undefined') {
            options.data = {};
          }

          if (Auth.jsonWebToken) {
            $http({
              method: options.method,
              url: path,
              headers: {
                'Authorization': Auth.jsonWebToken
              },
              data: options.data
            })
              // Retrieving data
              .then(getInfoComplete)
              // Handling errors
              .catch(getInfoError);
          }
          else {
            $http({
              method: options.method,
              url: path,
              data: options.data
            })
              // Retrieving data
              .then(getInfoComplete)
              // Handling errors
              .catch(getInfoError);
          }
          function getInfoComplete(response) {
            if (typeof (callBackSuccess) === 'function') {
              callBackSuccess(response.data);
            }
          } // getInfoComplete

          function getInfoError(error) {
            if (typeof (error.data) !== 'undefined') {
              console.log('Error:' + error.status + ': ', error.data);
            }
            // running failure CB, if passed
            if (typeof (callBackFailure) === 'function') {
              callBackFailure(error);
            }
            // defaulting to success CB, if no failure CB passed
            else if (typeof (callBackSuccess) === 'function') {
              callBackSuccess(error);
            }
          } // getInfoError
        } // makeCall

        function get(callBackSuccess, callBackFailure) {
          vm.makeCall({
            'method': 'GET'
          }, callBackSuccess, callBackFailure);
        } // get

        function post(userData, callBackSuccess, callBackFailure) {
          vm.makeCall({
            'method': 'POST',
            'data': userData
          }, callBackSuccess, callBackFailure);
        } // post

        function update(userData, callBackSuccess, callBackFailure) {
          vm.makeCall({
            'method': 'UPDATE',
            'data': userData
          }, callBackSuccess, callBackFailure);
        }
        // update*/

        function destroy(callBackSuccess, callBackFailure) {
          vm.makeCall({
            'method': 'DELETE'
          }, callBackSuccess, callBackFailure);
        } // destroy
      } // API
    } // apiCall
  } // apiFactory
})();
