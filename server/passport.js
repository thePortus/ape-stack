const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Models = require('./models');
const config = require('../config.json');

module.exports = function(passport) {
    // Setup work and export for the JWT passport strategy
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      Models.User.findOne(
        {
          where: {
            id: jwt_payload.id
          }
        }
      ).then(
        function(user) {

          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        }
      ).catch(
      function(err) {
          return done(err, false);
        }
      );
    }));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Models.User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user === null) {
        done(new Error('Wrong user id.'));
      }

      done(null, user);
    });
  });
};
