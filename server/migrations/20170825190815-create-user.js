'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'User',
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      about: {
        type: Sequelize.STRING,
        allowNull: true,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
