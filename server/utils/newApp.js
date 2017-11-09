/**
 * /server/utils/config.js
 * @file
 *
 * This module returns a new express app, with initial configurations set.
 * Additional configurations will be called by /server/app.js which
 * use other modules within utils. This module, however, is the first and
 * creates the app object.
 */

'use strict';

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  jsonParser = bodyParser.json();

const assets = require('../../assets');

const configApp = () => {

  /* app configuration */
  const app = express();

  /* Set JSON / Body Parser */
  app.use(jsonParser);
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // enable favorite icon
  app.use(favicon(path.join(__dirname, '..', '..', 'client', 'imgs', 'favicon.ico')));

  // set logging if in development environment
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }

  // set server view engine to ejs and view directory to /views
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', '/views'));

  // set static directory to client
  app.use(express.static(path.join(__dirname, '..', '..', assets.dirs.static)));

  return app;
};

module.exports = configApp;
