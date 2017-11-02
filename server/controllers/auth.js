const express = require('express'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  router = express.Router();

const config = require('../../config.json'),
  Models = require('../models');

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
const login = (req, res) => {
  Models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    if (!user) {
      res.send(
        {
          action: 'authenticate',
          success: false,
          user: req.body.username,
          message: 'Authentication failed. User not found.'
        }
      );
    } else {
      var password = req.body.password;
      var hashedPassword = bcrypt.hashSync(password, user.salt);
      // Check if password matches
      if(hashedPassword === user.password) {
        var token = jwt.sign(
          {
            username: user.username,
            password: user.password
          },
          config.secret,
          {
            expiresIn: 10080 // in seconds
          }
        );
        res.json({
          action: 'authenticate',
          success: true,
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          about: user.about,
          token: 'JWT ' + token
        }
        );
      }
      else {
        res.send({
          action: 'authenticate',
          success: false,
          user: req.body.username,
          message: 'Authentication failed. Passwords did not match.'
        });
      }
    }
  });
};

const logout = (req, res) => {

};

module.exports = {
  'login': login,
  'logout': logout
};
