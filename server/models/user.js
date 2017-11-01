'use strict';

<<<<<<< HEAD
const UserModel = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
=======
function UserModel(sequelize, DataTypes) {
  return sequelize.define('User', {
>>>>>>> 3fe8f845a97c4fbfd2261eccb398e83ad45eacb1
    id: {
      allowNull: false,
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
      allowNull: false,
      validate: {
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User',
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
<<<<<<< HEAD
  return User;
};
=======
}
>>>>>>> 3fe8f845a97c4fbfd2261eccb398e83ad45eacb1

module.exports = UserModel;
