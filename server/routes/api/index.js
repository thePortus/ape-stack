'use strict';

const fs = require('fs'),
  path = require('path');

var exports = {};

// read contents of this directory and limit to .js files
fs.readdirSync(__dirname)
  .filter(function(subdir) {
    return fs.statSync(path.join(__dirname, subdir)).isDirectory();
  })
  // require each file into export's properties
  .forEach(function(subdir) {
    exports[subdir] = require('./' + subdir);
  });

module.exports = exports;
