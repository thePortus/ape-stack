'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('RolePrivileges', {
      role: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      privilege: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('RolePrivileges');
  }
};
