(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.users')
    .factory('Users', usersFactory);


  function usersFactory(Api) {
    return new UsersModel();

    function UsersModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */
      vm.table_name = {label: 'Users', value: 'Users'};
      vm.id_field = {label: 'ID', value: 'id', display: true};
      vm.title_field = {label: 'Users', value: 'User', display: true};
      vm.fields = [
        {label: 'ID', value: 'id', display: false},
        {label: 'Username', value: 'username'},
        {label: 'Email', value: 'email'},
        {label: 'First Name', value: 'firstName'},
        {label: 'Last Name', value: 'lastName'},
        {label: 'About', value: 'about'},
        {label: 'Role', value: 'role'},
        {label: 'Created', value: 'createdAt'},
        {label: 'Updated', value: 'updatedAt'}
      ];

      /* Methods */
      vm.get = get;
      vm.getAll = getAll;
      vm.create = create;
      vm.update = update;
      vm.destroy = destroy;

      /* Functions */
      function get(idNum, callBackSuccess, callBackFailure) {
        // Fetching data and sending it local callback
        var api = new Api('users', idNum);
        api.get(callBackSuccess, callBackFailure);
      }

      function getAll(callBackSuccess, callBackFailure) {
        // Fetching data and sending it local callback
        var api = new Api('users');
        api.get(callBackSuccess, callBackFailure);
      }

      function create(userData, callBackSuccess, callBackFailure) {
        // Fetching data and sending it local callback
        var api = new Api('users');
        api.post(userData, callBackSuccess, callBackFailure);
      }

      function update(idNum, userData, callBackSuccess, callBackFailure) {
        // Fetching data and sending it local callback
        var api = new Api('users', idNum);
        api.post(userData, callBackSuccess, callBackFailure);
      }

      function destroy(idNum, callBackSuccess, callBackFailure) {
        // Sending api command to delete the user
        var api = new Api('users', idNum);
        api.destroy(callBackSuccess, callBackFailure);
      }

    }
    /*close UsersModel*/
  }
  /*close usersFactory*/
})();
