'use strict';

function RoleModel(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    timestamps: false,
    role: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    order: {
      type: DataTypes.INTEGER,
      unique: true
    }
  });

  /*
   model associations
   */

  Role.associate = (models) => {
    // put model associations here
    Role.associate = (models) => {
      Role.hasMany(models.User, {
        foreignKey: 'role',
        targetKey: 'role'
      });

      Role.belongsToMany(models.Privilege, {
        as: "Privileges",
        through: "RolePrivileges",
        foreignKey: "roles"
      });
    };
  };

  return Role;

}

module.exports = RoleModel;
