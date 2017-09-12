(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.users')
    .factory('UsersList', usersListFactory);


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
        {label: 'Password', value: 'password'},
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

      /* Functions */
      function get(tableFactoryCallBack) {
        // Fetching data and sending it local callback
        var api = new Api('users');
        api.get(transformDataCB);

        function transformDataCB(responseData) {

          // Sending altered data back to controller
          tableFactoryCallBack(responseData);
        }
      }
    }
    /*close UsersListModel*/

  }
  /*close usersListFactory*/

})();
