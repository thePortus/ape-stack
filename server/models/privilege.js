'use strict';

function PriviledgeModel(sequelize, DataTypes) {
  var Priviledge = sequelize.define('Priviledge', {
    privilege_id: {
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
  return Priviledge;
}

module.exports = PriviledgeModel;
