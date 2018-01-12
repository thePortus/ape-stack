/**
 * @file /utils/paths.js
 * @module paths
 * @memberof utils
 * @description Functions to perform batch operations on lists of paths
 */

'use strict';

const path = require('path');

// error handlers
function errorNonIterable() {
  throw new Error('Argument must be an iterable object, non-iterable item passed');
}

function errorNonStringInIterable() {
  throw new Error('Iterable must only contain strings, argument contains non-string item(s)');
}

module.exports = {

  /**
   * Determines if the object passed is iterable (e.g. array) or not
   * @memberof  utils.paths
   * @param     {*}               object        any object
   * @return    {bolean}                        true if object is iterable
   * @throws    {Error}                         if object does not exist
   */
  isIterable(object) {
    return typeof (object[Symbol.iterator]) === 'function';
  }, // isIterable

  /**
   * Gets a list of full paths and returns a list of each basename.
   * Useful for getting filenames or lowest level subdirectories
   * @memberof  utils.paths
   * @param     {string[]}        paths         partial or full system paths
   * @return    {string[]}                      file and/or folder names
   * @throws    {Error}                         if paths is non-interable
   */
  basenamesFromPaths(paths) {
    let basenames = [];
    // ensure iterable list of strings passed
    if (!this.isIterable(paths)) { return errorNonIterable(); }
    if (!this.iterableOnlyContainsType(paths, 'string')) { return errorNonStringInIterable(); }
    // loop through each path and push basename
    for (let x = 0; x < paths.length; x += 1) {
      basenames.push(path.basename(paths[x]));
    }
    return basenames;
  }, // basenamesFromPaths

  /**
   * Prepends and appends a list of paths with a prefix and/or suffix.
   * To use with suffix but no prefix, send undefined or '' any non-string value for prefix.
   * @memberof  utils.paths
   * @param     {string[]}        paths         list of partial paths
   * @param     {string|string[]} [prefix]      partial path to prepend (optional)
   * @param     {string|string[]} [suffix]      partial path to append (optional)
   * @return    {string[]}                      full paths
   * @throws    {Error}                         if paths is non-iterable
   * @throws    {Error}                         if any item in path is non-string
   * @throws    {Error}                         if prefix/suffix is extant but not string or array of strings
   */
  buildPaths(paths, prefix, suffix) {
    let builtPaths = [];

    // throw errors if paths not iterable or if passed prefix/suffix is either string or list of string elements
    if (!this.isIterable(paths)) { return errorNonIterable(); }
    if (prefix && typeof (prefix) !== 'undefined' && typeof (prefix !== 'string')) {
      if (!this.isIterable(prefix)) { return errorNonIterable(); }
      if (!this.iterableOnlyContainsType(prefix, 'string')) { return errorNonStringInIterable(); }
    }
    if (suffix && typeof (suffix) !== 'undefined' && typeof (suffix !== 'string')) {
      if (!this.isIterable(suffix)) { return errorNonIterable(); }
      if (!this.iterableOnlyContainsType(suffix, 'string')) { return errorNonStringInIterable(); }
    }

    // at this point if prefix/suffix is non-string, it must be array of
    // path elements, so apply array elements to path.join arguments
    if (typeof (prefix) !== 'string') { prefix = path.join.apply(prefix); }
    if (typeof (prefix) !== 'string') { suffix = path.join.apply(suffix); }
    // set prefix and suffix to false if they are not strings or are empty
    prefix = typeof (prefix) === 'string' && prefix.length ? prefix : false;
    suffix = typeof (suffix) === 'string' && suffix.length ? suffix : false;

    // loop through list of partial paths
    for (let x = 0; x < paths.length; x += 1) {
      let currentPath = paths[x];
      // throw error if non-string found
      if (typeof (currentPath) !== 'string') { return errorNonStringInIterable(); }
      // add prefix if extant, then append suffix if extant, then append
      currentPath = prefix ? path.join(prefix, currentPath) : currentPath;
      currentPath = suffix ? path.join(currentPath, suffix) : currentPath;
      builtPaths.push(currentPath);
    }
    return builtPaths;
  } // buildPaths

};
