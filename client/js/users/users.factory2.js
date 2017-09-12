(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.users')
    .factory('Users2', usersListFactory);


  function usersListFactory(Api) {
    return new UsersListModel();

    function UsersListModel() {
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
      function get(idNum, callBack) {
        // Fetching data and sending it local callback
        var api = new Api('users', idNum);
        api.get(transformDataCB);

        function transformDataCB(responseData) {

          // Sending altered data back to callback
          callBack(responseData);
        }
      }


    function getAll(callBack) {
      // Fetching data and sending it local callback
      var api = new Api('users');
      api.get(transformDataCB);

      function transformDataCB(responseData) {

        // Sending altered data back to callback
        callBack(responseData);
      }
    }

    function create(userData, callBack) {
      // Fetching data and sending it local callback
      var api = new Api('users');
      api.post(userData, transformDataCB);

      function transformDataCB(responseData) {

        // Sending altered data back to callback
        callBack(responseData);
      }
    }

    function update(idNum, userData, callBack) {
      // Fetching data and sending it local callback
      var api = new Api('users', idNum);
      api.post(userData, transformDataCB);

      function transformDataCB(responseData) {

        // Sending altered data back to callback
        callBack(responseData);
      }
    }

    function destroy(idNum, callBack) {
      // Sending api command to delete the user
      var api = new Api('users', idNum);
      api.destroy(transformDataCB);

      function transformDataCB(responseData) {
        // chance to alter data here, if destire
        callBack(responseData);
      }
    }

  }
    /*close UsersListModel*/

  }
  /*close usersListFactory*/

})();
