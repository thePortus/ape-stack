'use strict';

function RoleModel(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    role_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    order: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Role;
}

module.exports = RoleModel;
