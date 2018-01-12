'use strict';
module.exports = (sequelize, DataTypes) => {
  var Privilege = sequelize.define('Privilege', {
    privilege: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Privilege;
};
