'use strict';

const seederData = require('./data/rolePrivileges.json');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var processedRecords = [];
    for(var x = 0; x < seederData.length; x += 1) {
      var seedRecord = seederData[x];
      processedRecords.push({
        'role': seedRecord.role,
        'privilege': seedRecord.privilege,
      });
    }
    return queryInterface.bulkInsert('RolePrivileges', processedRecords);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RolePrivileges', seederData);
  }
};
