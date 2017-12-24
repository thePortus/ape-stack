/**
 * @file /server/utils/errors.js
 * @module errors
 * @memberof server.utils
 * @description Error handling functions for express server
 */

 'use strict';

const path = require('path');

/**
 * Configures error handling for express app
 * @memberof server.utils.errors
 * @param  {}     app        express app passed from the main script
 * @return {}                express app with error handling configured
 */
const errorHandler = (app) => {
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
  return app;
};

module.exports = {
  'handler': errorHandler
};
