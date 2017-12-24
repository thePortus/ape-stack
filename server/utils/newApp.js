/**
 * @file /server/utils/newApp.js
 * @module newApp
 * @memberof server.utils
 * @description Functions to create a new express app, with initial configurations set.
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

/**
 * Sets basic configuration for express app, including parsers, view engines, static dirs, and favicon
 * @memberof server.utils.auth
 * @return {}                 express app with initial configurations set
 */
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
