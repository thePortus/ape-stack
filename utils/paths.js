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
   * @param     {*}               object        Any object
   * @return    {bolean}                        True if object is iterable
   * @throws                                    Throws error if object doesn't exist
   */
  isIterable(object) {
    return typeof(object[Symbol.iterator]) === 'function';
  }, // isIterable

  /**
   * Checks if an iterable objects contains only items of a specified type (e.g. 'string')
   * (shallow search only)
   * @memberof utils.paths
   * @param     {*[]}             object        Iterable object whose contents will be checked
   * @param     {string}          typeof        Specifies type of variables inside object
   * @return    {boolean}                       True if every item
   * @throws                                    Throws error if non iterable object passed
   * @throws                                    Throws error if type is unspecified or a non-string
   */
  iterableOnlyContainsType(object, type) {
    // ensure iterable object passed and type is a valid string
    if(!this.isIterable(object)) { return errorNonIterable(); }
    if(typeof(type) !== 'string') { throw new Error('Arg "type" must be specified and a string'); }
    // iterate through object
    for(let x = 0; x < object.length; x += 1) {
      // immediately return false if item found not matching type
      if(typeof(object[x]) !== type) { return false; }
    }
    // return true if loop completed without finding a mismatch
    return true;
  }, // iterableContainsNonStrings

  /**
   * Gets a list of full paths and returns a list of each basename.
   * Useful for getting filenames or lowest level subdirectories
   * @memberof  utils.paths
   * @param     {string[]}        paths         Partial or full system paths
   * @return    {string[]}                      File and/or folder names
   * @throws                                    Throws error if paths is non-interable
   */
  basenamesFromPaths(paths) {
    let basenames = [];
    // ensure iterable list of strings passed
    if (!this.isIterable(paths)) { return errorNonIterable(); }
    if (!this.iterableOnlyContainsType(paths, 'string')) { return errorNonStringInIterable(); }
    // loop through each path and push basename
    for (let x = 0;  x < paths.length; x += 1) {
      basenames.push(path.basename(paths[x]));
    }
    return basenames;
  }, // basenamesFromPaths

  /**
   * Prepends and appends a list of paths with a prefix and/or suffix.
   * To use with suffix but no prefix, send undefined or '' any non-string value for prefix.
   * @memberof  utils.paths
   * @param     {string[]}        paths         List of partial paths
   * @param     {string|string[]} [prefix]      Partial path to prepend (optional)
   * @param     {string|string[]} [suffix]      Partial path to append (optional)
   * @return    {string[]}                      Full paths
   * @throws                                    Throws error if paths is non-interable
   * @throws                                    Throws error if any item in paths is a non-string
   * @throws                                    Throws error if prefix/suffix is extant but not a string or list of string elements
   */
  buildPaths(paths, prefix, suffix) {
    let builtPaths = [];

    // throw errors if paths not iterable or if passed prefix/suffix is either string or list of string elements
    if (!this.isIterable(paths)) { return errorNonIterable(); }
    if(prefix && typeof(prefix) !== 'undefined' && typeof(prefix !== 'string')) {
      if (!this.isIterable(prefix)) { return errorNonIterable(); }
      if (!this.iterableOnlyContainsType(prefix, 'string')) { return errorNonStringInIterable(); }
    }
    if(suffix && typeof(suffix) !== 'undefined' && typeof(suffix !== 'string')) {
      if (!this.isIterable(suffix)) { return errorNonIterable(); }
      if (!this.iterableOnlyContainsType(suffix, 'string')) { return errorNonStringInIterable(); }
    }

    // at this point if prefix/suffix is non-string, it must be array of
    // path elements, so apply array elements to path.join arguments
    if (typeof(prefix) !== 'string') {prefix = path.join.apply(prefix);}
    if (typeof(prefix) !== 'string') {suffix = path.join.apply(suffix);}
    // set prefix and suffix to false if they are not strings or are empty
    prefix = typeof(prefix) === 'string' && prefix.length ? prefix : false;
    suffix = typeof(suffix) === 'string' && suffix.length ? suffix : false;

    // loop through list of partial paths
    for (let x = 0; x < paths.length; x += 1) {
      let currentPath = paths[x];
      // throw error if non-string found
      if (typeof(currentPath) !== 'string') {return errorNonStringInIterable();}
      // add prefix if extant, then append suffix if extant, then append
      currentPath = prefix ? path.join(prefix, currentPath) : currentPath;
      currentPath = suffix ? path.join(currentPath, suffix) : currentPath;
      builtPaths.push(currentPath);
    }
    return builtPaths;
  } // buildPaths

};
