/**
 * @file /server/utils/auth.js
 * @module auth
 * @memberof server.utils
 * @description Passport strategy functions to enable authentication on express server
 */

 'use strict';

const passport = require('passport'),
  passportJwt =  require('passport-jwt');

// local dependencies
const config = require('../../config.json'),
  models = require('../models');

//configure strategy
const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

/**
 * Strategy for passport.js which enables json web token authentication
 * @memberof server.utils.auth
 * @param  {{}}       app     express app passed from the main script
 * @return {{}}                   express app with passport enabled
 */
function enableJsonWebToken(app) {
  app.use(passport.initialize());
  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  jwtOptions.secretOrKey = config.secret;

  let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    let user = models.User.findOne({where: {id: jwt_payload.id}});
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  passport.use(strategy);
  return app;
} // enableJsonWebToken

module.exports = {
  'enableJsonWebToken': enableJsonWebToken
};
