#!/usr/bin/env node

/**
* @file /scripts/utils.js
* @desc General functions, especially (but not limited to) those created for npm /scripts
* @module general
* @memberof utils
*/

'use strict';

const path = require('path'),
  spawnProcess = require('child_process').spawn,
  fs = require('fs-extra'),
  rimraf = require('rimraf'),
  mkdirp = require('mkdirp'),
  ncp = require('ncp').ncp;

// set maximum concurrent files for ncp
ncp.limit = 16;

/**
 * Callback function employed as default by several functions in this file.
 * @param  {Object}     err     error message (if any error was encountered)
 * @return {Boolean}            true (signal completion)
 */
function defaultCB(err) {
  if (err) {
    throw new Error(err);
  }
  return true;
} // defaultCB

/**
 * Returns a new cb similar to defaultCB, except that it allows passing
 * a message to be displayed on exit/error. Note that this function makes a cb,
 * it is not the cb itself.
 * @param  {string} [onDone] message to be displayed upon completion
 * @param  {string} [onError] message to be displayed upon completion
 * @return {Boolean}     true
 */
function makeCB(onDone, onError) {
  return (err) => {
    if (err) {
      console.error(onError);
      throw new Error(err);
    }
    if (typeof msg === 'string') {
      console.log(onDone);
    }
    return true;
  };
}

/**
 * Builds full system paths to major directories. The results of this function,
 * and not the function itself, are exported when this module is included.
 * @memberof general
 * @return {Object} [keyword object containing major paths]
 */
function projectPaths() {
  // predefining higher level dirs so subdirs can build on their path
  const rootPath = path.normalize(path.join(__dirname, '..'));
  const staticPath = path.join(rootPath, 'client');
  return {
    root: rootPath,
    static: staticPath,
    node_modules: path.join(rootPath, 'node_modules'),
    lib: path.join(staticPath, 'lib'),
    dist: path.join(staticPath, 'dist')
  };
}

/**
 * Checks if variable is iterable, returns true if so, false if not or undefined
 * @memberof general
 * @param  {Object}  checkObj         object to check
 * @return {Boolean}                     status of object
 */
function isIterable(checkObj) {
  if (checkObj === null) {
    return false;
  }
  if (typeof (checkObj[Symbol.iterator]) !== 'function') {
    return false;
  }
  return true;
} // isIterable

/**
 * Ensures that set of system paths are all extant
 * @param  {string|string[]}   paths  system paths to check
 * @param  {Function}          [cb=defaultCB]     callback for completion/error handling
 * @return {string[]}          unmodified paths
 */
function checkPaths(paths, cb = defaultCB) {
  // if a single path sent, wrap string in array
  paths = typeof (paths) === 'string' ? [paths] : paths;
  // if paths object is not iterable, invoke
  if (!isIterable(paths)) {
    cb(new Error('Non-iterable object sent as paths'));
  }
  // loop through paths
  for (let x = 0; x < paths.length; x += 1) {
    if (typeof (paths[x]) !== 'string') {
      cb(new Error('Non-string encountered in paths. Received: ' + typeof (paths[x])));
    }
    if (!fs.existsSync(path.normalize(paths[x]))) {
      cb(new Error('Non-extant path found. Received: ' + paths[x]));
    }
  }
  // invoke cb and return paths unmodified
  cb();
  return paths;
}

/**
 * Prepends/appends prefixes/suffixes to every item in a list of system paths
 * @memberof general
 * @param  {string}   prefix  prepends each path
 * @param  {string[]} paths   list of system paths to be altered
 * @param  {string}   suffix  appends each path
 * @return {string[]}         completed system paths
 */
function addToPaths(paths, prefix, suffix) {
  let newPaths = [];
  // loop through paths, get each, make changes and push to newPaths
  paths.forEach((currentPath) => {
    // if a prefix was sent, prepend to path
    if (typeof (prefix) !== 'undefined' && typeof (prefix) !== 'undefined') {
      currentPath = path.join(prefix, currentPath);
    }
    // if a suffix was sent, append to path
    if (typeof (suffix) !== 'undefined' && typeof (suffix) !== 'undefined') {
      currentPath = path.join(currentPath, suffix);
    }
    // add the modified path to newPaths
    newPaths.push(currentPath);
  });
  return newPaths;
}

/**
* Deletes a path or series of paths recursively
* @memberof  general
* @param     {string|string[]}   sources                 array of paths for deletion
* @param     {Function}          [cb=defaultCB]          callback for error handling & completion
* @return    {Boolean|*}                                 true or result of passed callback
* @throws                                                if sources is not iterable
* @throws                                                if sources contains non-string
* @throws                                                if sources contains non-extant path
 */
function deletePaths(paths, cb = defaultCB) {
  // ensures paths exist, if single string sent, wraps it in array
  paths = checkPaths(paths, cb);
  // loop through each path
  for (let x = 0; x < paths.length; x += 1) {
    rimraf.sync(paths[x]);
  }
  return cb();
} // deletePaths

/**
 * Copies series of files to inside a specified destination directory
 * @memberof  general
 * @param     {string|string[]}   sources                 array of to be copied
 * @param     {string}            destination             directory to contain copies
 * @param     {Function}          [cb=defaultCB]          callback for error handling & completion
 * @return    {Boolean|*}                                 true or result of passed callback
 * @throws                                                if sources is not iterable
 * @throws                                                if sources contains non-string
 * @throws                                                if sources contains non-extant path
 */
function copyPaths(sources, destination, cb = defaultCB) {
  // ensures paths exist, if single string sent, wraps it in array
  sources = checkPaths(sources, cb);
  // if destination directory doesn't exist, create it
  if (!fs.existsSync(destination)) {
    mkdirp.sync(destination);
  }
  // loop through each source
  for (let x = 0; x < sources.length; x += 1) {
    try {
      // copy file to target dir + filename
      fs.copySync(sources[x], path.join(destination, path.basename(sources[x])));
    }
    catch (err) {
      return cb(err);
    }
  }
  // signal success
  return cb();
} // copyFiles

/**
 * Spawns a shell process with cmd using options specified in args, before
 * executing a cb upon error or returning true upon success
 * @param  {[type]} cmd            shell command
 * @param  {string|string[]} args           options for the process
 * @param  {Function}                true on success
 */
function spawn(cmd, args, cb = defaultCB) {
  // wraps args in array if single string accidentally sent
  if (typeof args === 'string') {
    args = [args];
  }
  if (!isIterable(args)) {
    cb(new Error('command args must be iterable'));
  }
  return spawnProcess(cmd, args)
    .on('error', (err) => { cb(err); })
    .on('exit', () => { console.log('Finished'); return cb(); });
}

module.exports = {
  paths: projectPaths(),
  defaultCB: defaultCB,
  makeCB: makeCB,
  isIterable: isIterable,
  checkPaths: checkPaths,
  addToPaths: addToPaths,
  deletePaths: deletePaths,
  copyPaths: copyPaths,
  spawn: spawn
};
