'use strict';

const passport = require('passport'),
  passportJwt =  require('passport-jwt');

// local dependencies
const config = require('../../config.json'),
  models = require('../models');

//configure strategy
const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

function enableJsonWebToken(app) {
  app.use(passport.initialize());
  var jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  jwtOptions.secretOrKey = config.secret;

  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    // usually this would be a database call:
    var user = models.User.findOne(
      {
        where: {
          id: jwt_payload.id
        }
      }
    );
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  passport.use(strategy);
  return app;
}

module.exports = {
  'enableJsonWebToken': enableJsonWebToken
};
