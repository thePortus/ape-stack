/**
 * @file server/utils/staticAssets.js
 * @module staticAssets
 * @description Functions to generate different static asset paths for node views based upon the current NODE_ENV
 * @memberof server.utils
 */

const path = require('path');

const utils = require(path.join(__dirname, '..', '..', 'utils')),
  assets = require(path.join(__dirname, '..', '..', 'assets.json'));

module.exports = {

  /**
   * styles - Generates a list of css/less assets specifiec to the node environment.
   * @memberof server.utils.staticAssets
   * @return {string[]} stylesheet asset paths
   */
  styles() {
    // if in a testing or production env, only return minified css
    if (!utils.env.isDevEnv()) {
      return {
          'css': [
            path.join(assets.dirs.dist, 'lib.min.css'),
            path.join(assets.dirs.dist, 'app.min.css')
          ],
          'less': []
      };
    }
    // build and append vendor css filepaths
    let vendorPaths = utils.paths.buildPaths(
      utils.paths.basenamesFromPaths(assets.vendor.css),
      path.join(assets.dirs.lib, assets.dirs.css)
      // remove folder info since after static files are collected dir structure is lost
    );
    // build and append internal css filepaths
    let internalCSSPaths = utils.paths.buildPaths(
      assets.source.css,
      path.join(assets.dirs.styles, assets.dirs.css)

    );
    // build and append internal less filepaths
    let internalLessPaths = utils.paths.buildPaths(
      assets.source.less,
      path.join(assets.dirs.styles, assets.dirs.less)
    );
    // merge items of each list into single array and return
    return {
      'css': [...vendorPaths, ...internalCSSPaths],
      'less': internalLessPaths
    };
  }, // styes

  /**
   * scripts - Generates a list of js assets specific to the node environment.
   * @memberof server.utils.staticAssets
   * @return {string[]} stylesheet asset paths
   */
  scripts() {
    // if in a testing or production env, only return minified js
    if (!utils.env.isDevEnv()) {
      return [
        path.join(assets.dirs.dist, 'lib.min.js'),
        path.join(assets.dirs.dist, 'app.min.js'),
      ];
    }
    // build and append vendor js filepaths
    let vendorPaths = utils.paths.buildPaths(
      // remove folder info since after static files are collected dir structure is lost
      utils.paths.basenamesFromPaths(assets.vendor.js),
      path.join(assets.dirs.lib, assets.dirs.scripts)
    );
    // build and append internal js filepaths
    let internalPaths = utils.paths.buildPaths(
      assets.source.js,
      path.join(assets.dirs.scripts)
    );
    // merge items of each list into single array and return
    return [...vendorPaths, ...internalPaths];
  } // scripts

};
