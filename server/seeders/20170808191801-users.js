'use strict';

const bcrypt = require('bcrypt');

const seederData = require('./data/users.json');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var processedRecords = [];
    for(var x = 0; x < seederData.length; x += 1) {
      var currentRecord = seederData[x];
      // get and encrypt passwords
      var password = currentRecord.password;
      var salt = bcrypt.genSaltSync();
      var hashedPassword = bcrypt.hashSync(password, salt);
      // insert into table, generating dates
      processedRecords.push({
        username: currentRecord.username,
        email: currentRecord.email,
        password: hashedPassword,
        salt: salt,
        role: currentRecord.role,
        firstName: currentRecord.firstName,
        lastName: currentRecord.lastName,
        about: currentRecord.about,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    }
    return queryInterface.bulkInsert('Users', processedRecords);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', seederData);
  }
};
