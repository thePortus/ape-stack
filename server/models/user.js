'use strict';

function UserModel(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      validate: {
        isDate: true
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      validate: {
        isDate: true
      }
    }
  });
  User.associate = (models) => {
    // put model associations here
    User.belongsTo(models.Role, {
      foreignKey: 'role',
      targetKey: 'role'
    });
  };
  return User;
}

module.exports = UserModel;
