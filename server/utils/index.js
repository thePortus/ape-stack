/**
 * @file /server/utils/index.js
 * @module utils
 * @memberof server
 * @description Node server general utility functions and objects
 */

'use strict';

const fs = require('fs'),
  path = require('path'),
  basename = path.basename(module.filename);

var exports = {};

// read contents of this directory and limit to .js files
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // require each file into export's properties
  .forEach(function(file) {
    const filename = file.slice(0, -3);
    exports[filename] = require('./' + filename);
  });

module.exports = exports;
