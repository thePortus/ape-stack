'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Privileges', {
      privilege: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Privileges');
  }
};
