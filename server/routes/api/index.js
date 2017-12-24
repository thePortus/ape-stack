'use strict';

const fs = require('fs'),
  path = require('path'),
  basename = path.basename(module.filename),
  env = process.env.NODE_ENV || 'development';

var exports = {};

// read contents of this directory and limit to .js files
fs.readdirSync(__dirname)
  .filter(function(subdir) {
    return fs.statSync(__dirname + '/' + subdir).isDirectory();
  })
  // require each file into export's properties
  .forEach(function(subdir) {
    exports[subdir] = require('./' + subdir);
  });

module.exports = exports;
