/**
 * /server/app.js
 * @file
 *
 * This is the main server file. It calls various util functions which
 * configure the application, and then it sets the base routes, which are
 * found in the routes subdir.
 */

'use strict';

// local dependencies
const utils = require('./utils');

// new app with environment, view engine, static dirs, favicon, logger, and parsers configured
var app = utils.newApp();

// enable authentication strategies
utils.auth.enableJsonWebToken(app);

// set app index and api routes (v1 is the default route)
app.use('/', require('./routes'));
app.use('/api', require('./routes/api/v1'));
app.use('/api/v1', require('./routes/api/v1'));

// error handlers
utils.errors.handler(app);

module.exports = app;
