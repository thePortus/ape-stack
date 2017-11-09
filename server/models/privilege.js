'use strict';

module.exports = function(sequelize, DataTypes) {
  var Privilege = sequelize.define('Privilege', {
    timestamps: false,
    privilege: DataTypes.STRING
  });
  Privilege.associate = (models) => {
    Privilege.belongsToMany(models.Role, {
      as: "Roles",
      through: "RolePrivileges",
      foreignKey: "privilege"
    });
  };
  return Privilege;
};
