/**
 *
 * @file /utils/assets.js
 * @module assets
 * @memberof utils
 * @description Utility object for building the various partial paths in assets.json and return different lists of absolute paths as needed for various operations involving external and internal dependencies.
 */

"use strict";

const path = require('path');
const fs = require('fs');

const assets = require('../assets.json');

// Path to project root
const root = path.join(__dirname, '../');

/**
 * Abstract class for generating source and/or target paths for various package assets
 * @memberof utils.assets
 * @abstract
 */
class AbstractAssets {

  /**
   * Makes an AbstractAsset
   * @memberof utils.assets.AbstractAssets
   * @param  {string}   type    specifies if assets are js, css, or other
   * @constructor
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * Gets a list of paths and returns a list of respective basenames
   * @memberof utils.assets.AbstractAssets
   * @param  {string[]}   paths   list of system paths
   * @return {string[]}           list of basenames
   */
  getPathsFilenames(paths) {
    let filenames = [];
    paths.forEach((currentPath) => {
      filenames.push(path.basename(currentPath));
    });
    return filenames;
  } // getPathsFileNames

  /**
   * Prepends/appends prefixes/suffixes to every item in a list of system paths
   * @memberof utils.assets.AbstractAssets
   * @param  {string}   prefix  prepends each path
   * @param  {string[]} paths   list of system paths to be altered
   * @param  {string}   suffix  appends each path
   * @return {string[]}         completed system paths
   */
  addToPaths(prefix, paths, suffix) {
    var newPaths = [];
    // loop through paths, get each, make changes and push to newPaths
    paths.forEach((currentPath) => {
      // if a prefix was sent, prepend to path
      if (typeof(prefix) !== 'undefined' && typeof(prefix) !== null) {
        currentPath = path.join(prefix, currentPath);
      }
      // if a suffix was sent, append to path
      if (typeof(suffix) !== 'undefined' && typeof(suffix) !== null) {
        currentPath = path.join(currentPath, suffix);
      }
      // add the modified path to newPaths
      newPaths.push(currentPath);
    });
    return newPaths;
  } // /addToPaths

} // AbstractAssets

/**
 * Class for generating locale paths
 * @extends AbstractAssets
 * @memberof utils.assets
 */
class LocaleAssets extends AbstractAssets {

  constructor() {
    super('js');
    this.target = path.join(root, assets.dirs.static, assets.dirs.lib, assets.dirs.locales);
  } // constructor

  /**
   * Getter which returns the source files
   * @memberof utils.assets.LocaleAssets
   * @returns {string[]}  system paths
   */
  get sources() {
    let sources = [];
    assets.localesSrc.forEach((localeSrc) => {
      sources.push(path.join(root, assets.dirs.dependencies, localeSrc));
    });
    return sources;
  }

} // LocaleAssets


/**
 * Class for generating paths during gulpfile static asset collection.
 * @extends AbstractAssets
 * @memberof utils.assets
 */
class CollectionAssets extends AbstractAssets {

  constructor(type) {
    super(type);
    this.target = path.join(root, assets.dirs.static, assets.dirs.lib);
  }

  /**
   *  Getter which returns dependency paths of relevant type
   * @memberof utils.assets.CollectionAssets
   * @returns {string[]}  system paths
   */
  get dependencies() {
    return this.addToPaths(
      path.join(root, assets.dirs.dependencies),
      assets.vendor[this.type]
    );
  }

} // CollectionAssets


/**
 * Class for generating paths during gulp concatenation and minification
 * @extends AbstractAssets
 * @memberof utils.assets
 */
class BuildAssets extends AbstractAssets {

  /**
   * Makes a BuildAssets object
   * @memberof utils.assets.BuildAssets
   * @param  {string}   type      specifies if assets are js, css, or other
   * @param  {string}   category  specified if assets are internal or external
   * @constructor
   */
  constructor(type, category) {
    super(type);
    this.category = category;
    this.filename = null;
    this.target = path.join(root, assets.dirs.static, assets.dirs.dist);
    if (this.category !== 'external' && this.category !== 'internal') {
      throw new Error('BuildAssets category argument must be either internal or external');
    }
    this.filename = (category === 'internal') ? 'app.min.' + this.type : 'lib.min.' + this.type;
  }

  /**
   * Getter which returns source paths of relevant type
   * @memberof utils.assets.BuildAssets
   * @returns {string[]}  system paths
   */
  get sources() {
    // category should be internal or external... defaults to external
    if (this.category === 'internal') {
      return this.addToPaths(
        path.join(root, assets.dirs.static, this.type),
        assets.source[this.type]
      );
    }
    return this.addToPaths(
      path.join(root, assets.dirs.dependencies),
      assets.vendor[this.type]
    );
  }
} // BuildAssets


/**
 * Generates client-side static paths for express views - DEPRECATED, see {@link server/utils/staticAssets|staticAssets}
 * @extends AbstractAssets
 * @memberof utils.assets
 * @deprecated
 */
class RuntimeAssets extends AbstractAssets {

  constructor(type) {
    super(type);
    this.env = process.env.NODE_ENV;
  }

  /**
   * Getter which returns asset paths of relevant type
   * @memberof utils.assets.RuntimeAssets
   * @returns {string[]}  system paths
   */
  get assets() {
    // in live or test mode, use built files
    if (this.env === 'test' || this.env === 'production') {
      // return empty list for less resources, they are not used in live mode
      if (this.type === 'less') {
        return [];
      }
      // return 2 item list, one to compiled vendors scripts, other to internal compiled scripts
      return [
          path.join(assets.dirs.dist, 'lib.min.' + this.type),
          path.join(assets.dirs.dist, 'app.min.' + this.type)
      ];
    }
    // otherwise, use individual source files for vendor and internal files
    else {
      // return vendor and internal filenames, unless type is less
      if (this.type !== 'less') {
        // build vendor paths
        return this.addToPaths(
          assets.dirs.lib,
          this.getPathsFilenames(assets.vendor[this.type])
        // concatenate with internal paths
        ).concat(
          this.addToPaths(
            this.type,
            assets.source[this.type]
          )
        );
      }
      // if type is less, no vendor files and use 'css' property for internal dependencies
      else {
        // build internal paths
        return this.addToPaths(
          this.type,
          assets.source[this.type]
        );
      }
    }
  } // assets

} // RuntimeAssets

/**
 * Generates less asset filepaths - WILL BE DEPCRECATED IN NEAR FUTURE
 * @extends AbstractAssets
 * @memberof utils.assets
 * @deprecated
 */
class LessAssets extends AbstractAssets {

  constructor() {
    super('less');
    this.files = this.addToPaths(
      path.join(root, assets.dirs.static, 'less'),
      assets.source.less
    );
  }

  /**
   * Getter which returns internal less assets
   * @memberof utils.assets.LessAssets
   * @returns {string[]}  system paths
   */
  get assets() {
    let assetObjects = [];
    this.files.forEach((currentFile) => {
      let dirPath = path.dirname(currentFile);
      let filename = path.basename(currentFile, path.extname(currentFile));
      assetObjects.push({
        'source': currentFile,
        'target': path.join(dirPath, filename + '.css')
      });
    });
    return assetObjects;
  }

} // LessAssets

module.exports = {
  'collect': CollectionAssets,
  'build': BuildAssets,
  'runtime': RuntimeAssets,
  'less': LessAssets,
  'locale': LocaleAssets
};
