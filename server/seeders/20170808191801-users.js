'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const password = 'password';
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'your@email.com',
      password: hashedPassword,
      salt: salt,
      role: 'Super Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      about: 'I am the super admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('User', [{
      username: 'admin'
    }]);
  }
};
