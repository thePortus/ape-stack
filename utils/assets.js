/**
* @file
* /sever/utils/assets.js
*
* Utility object for building the various partial paths in assets.json
* and return different lists of absolute paths as needed for various operations
* involving external and internal dependencies.
*
* David J. Thomas, copyright © 2017
*   thePortus.com
*/

"use strict";

const path = require('path');
const fs = require('fs');

const assets = require('../assets.json');

// Path to project root
const root = path.join(__dirname, '../');


class AbstractAssets {

  constructor(type) {
    this.type = type;
  }

  getPathsFilenames(paths) {
    let filenames = [];
    paths.forEach((currentPath) => {
      filenames.push(path.basename(currentPath));
    });
    return filenames;
  }

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

class LocaleAssets extends AbstractAssets {

  constructor() {
    super('js');
    this.target = path.join(root, assets.dirs.static, assets.dirs.lib, assets.dirs.locales);
  } // constructor

  get sources() {
    return this.sourceGetter;
  }

  sourceGetter() {
    let sources = [];
    assets.localesSrc.forEach((localeSrc) => {
      sources.push(path.join(root, assets.dirs.dependencies, localeSrc));
    });
    return sources;
  }

} // LocaleAssets

class CollectionAssets extends AbstractAssets {

  constructor(type) {
    super(type);
    this.target = path.join(root, assets.dirs.static, assets.dirs.lib);
  }

  get dependencies() {
    return this.addToPaths(
      path.join(root, assets.dirs.dependencies),
      assets.vendor[this.type]
    );
  }

} // CollectionAssets

class BuildAssets extends AbstractAssets {

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

  get sources() {
    return this.getPaths();
  }

  getPaths() {
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

class RuntimeAssets extends AbstractAssets {

  constructor(type) {
    super(type);
    this.env = process.env.NODE_ENV;
  }

  // setting getter properties
  get assets() {
    return this.getAssetType();
  } // assets

  getAssetType() {
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
  } // getAssetType
} // RuntimeAssets


class LessAssets extends AbstractAssets {

  constructor() {
    super('less');
    this.files = this.addToPaths(
      path.join(root, assets.dirs.static, 'less'),
      assets.source.less
    );
  }

  get assets() {
    return this.getAssets();
  }

  // makes list of files for less compiling, with properties for the
  // source (less) and the target (css) files
  getAssets() {
    var assetObjects = [];
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
