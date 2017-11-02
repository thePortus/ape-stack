'use strict';

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon'),
  logger = require('morgan');

// local dependencies
const config = require('../config.json'),
  assets = require('../assets'),
  auth = require('./utils/auth'),
  errors = require('./utils/errors'),
  homeIndex = require('./routes/index.js'),
  apiV1Index = require('./routes/api/v1/index.js');

/* app configuration */
const app = express(),
  jsonParser = bodyParser.json(),
  router = express.Router(),
  defaultApiIndex = apiV1Index;

/* Set JSON / Body Parser */
app.use(jsonParser);
app.use(bodyParser.urlencoded({
  extended: true
}));

// enable authentication strategies
auth.enableJsonWebToken(app);

// enable favorite icon
app.use(favicon(path.join(__dirname, '..', 'client', 'imgs', 'favicon.ico')));

// set logging if in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// set server view engine to ejs and view directory to /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set static directory to client
app.use(express.static(path.join(__dirname, '..', assets.dirs.static)));

app.use('/', homeIndex);
app.use('/api/v1', apiV1Index);

// error handler
errors.handler(app);

module.exports = app;
