'use strict';

const seederData = require('./data/privileges.json');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var processedRecords = [];
    for(var x = 0; x < seederData.length; x += 1) {
      var seedRecord = seederData[x];
      processedRecords.push({
        'privilege': seedRecord.privilege,
      });
    }
    return queryInterface.bulkInsert('Privileges', processedRecords);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Privileges', seederData);
  }
};
