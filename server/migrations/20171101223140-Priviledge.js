'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Priviledges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true
        }
      },
      order: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        validate: {
          isDate: true
        }
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        validate: {
          isDate: true
        }
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
