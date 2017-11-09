/**
 * [/server/utils/index.js]
 * @file
 * Auto index for a node module. File reads names of other .js files in this directory
 * and makes them available to any file that requires this module. Each file
 * will be available in the property of this module matching their filename,
 * minus the file extension.
 *
 * e.g. sample.js would be require('this_module').sample
 */

'use strict';

const fs = require('fs'),
  path = require('path'),
  basename = path.basename(module.filename),
  env = process.env.NODE_ENV || 'development';

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
