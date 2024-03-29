'use strict';

const seederData = require('./data/roles.json');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var processedRecords = [];
    for(var x = 0; x < seederData.length; x += 1) {
      var seedRecord = seederData[x];
      processedRecords.push({
        'role': seedRecord.role,
        'order': seedRecord.order
      });
    }
    return queryInterface.bulkInsert('Roles', processedRecords);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', seederData);
  }
};
