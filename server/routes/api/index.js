(function() {
  'use strict';

  const express = require('express');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const router = express.Router();

  const config = require('../../../config.json');
  const Models = require('../../models');

  router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the ape API',
    routes: ['authenticate', 'users']
  }));

  // Authenticate the user and get a JSON Web Token to include in the header of future requests.
  router.post('/authenticate', function(req, res) {
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
  });

  module.exports = router;

})();
