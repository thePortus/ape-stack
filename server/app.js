/* MODULE DEPENDENCIES */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();
const favicon = require('serve-favicon');
const logger = require('morgan');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// local dependencies
const config = require('../config.json');
const models = require('./models');

// routes
const indexRoute = require('./routes/index.js');
const apiIndex = require('./routes/api/index.js');
const usersApiRoute = require('./routes/api/users.js');

/* APP CONFIGURATION */

const app = express();

app.use(jsonParser);
app.use(bodyParser.urlencoded({
  extended: true
}));


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

app.use(favicon(path.join(__dirname, '..', 'client', 'imgs', 'favicon.ico')));
app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '..', '/client')));

app.use('/', indexRoute);
app.use('/api/', apiIndex);
app.use('/api/users/', usersApiRoute);


/* ERROR HANDLING*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
