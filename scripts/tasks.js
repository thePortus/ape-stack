#!/usr/bin/env node

/**
* @file /scripts/utils.js
* @desc General functions for local npm scripts
*/

'use strict';

const fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  UglifyJS = require('uglify-js');

const utils = require('../utils').general;

const assets = require('../assets.json');

/**
 * Gathers CSS, JS, and i18n vendor files from node dependency directories to static directory
 * @return {Boolean} true if operation was a success
 */
function gatherStatic() {
  console.log('Copying static files to', utils.paths.lib);
  // build css absolute paths from partials and copy inside lib dir
  utils.copyPaths(
    utils.addToPaths(assets.vendor.css, utils.paths.node_modules),
    path.join(utils.paths.lib, 'css')
  );
  // build js absolute paths from partials and copy inside lib dir
  utils.copyPaths(
    utils.addToPaths(assets.vendor.js, utils.paths.node_modules),
    path.join(utils.paths.lib, 'js')
  );
  // build i18n absolute paths from partials and copy inside lib dir
  utils.copyPaths(
    utils.addToPaths(assets.vendor.locales, utils.paths.node_modules),
    path.join(utils.paths.lib, 'locales')
  );
  console.log('Finished copying static files.');
  return true;
} // gatherStatic

function installFonts() {

}

function compressImages() {

}

function compileVendorStyles() {

}

function compileInternalStyles() {

}

function compileVendorScripts() {
  let sources = [];
  // looking for paths starting with '@' and escaping them if so
  for (let x = 0; x < assets.vendor.js.length; x += 1) {
    const escapedPath = assets.vendor.js[0] === '@' ? '\\' + assets.vendor.js : assets.vendor.js;
    sources.push(escapedPath);
  }
  let uglyCode = UglifyJS.minify(sources, {}, {
    sourceMap: 'lib.js.map',
    sourceRoot: path.join(utils.paths.node_modules)
  });
  console.log(uglyCode);
  let destination = utils.paths.dist;
  // if destination directory doesn't exist, create it
  if (!fs.existsSync(destination)) {
    mkdirp.sync(destination);
  }
  fs.writeFileSync(path.join(destination, 'lib.min.js'), uglyCode.code);
  fs.writeFileSync(path.join(destination, 'lib.js.map'), uglyCode.code);
}

function compileInternalScripts() {

}

function buildDocumentation() {

}

function cleanUp() {

}

module.exports = {
  gatherStatic: gatherStatic,
  fonts: installFonts,
  compressImages: compressImages,
  compileVendorStyles: compileVendorStyles,
  compileInternalStyles: compileInternalStyles,
  compileVendorScripts: compileVendorScripts,
  compileInternalScripts: compileInternalScripts,
  buildDocumentation: buildDocumentation,
  cleanUp: cleanUp
};
