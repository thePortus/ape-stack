#!/usr/bin/env node

/**
* @file /utils/testing.js
* @desc Utility functions used during testing. Configures chai with plugins,
* as well as functions to copy fixture template folders and clean them up
* for before/after hooks during testing.
*/

'use strict';

const fs = require('fs'),
  path = require('path'),
  ncp = require('ncp').ncp,
  rimraf = require('rimraf');

/**
 * Configures chai for project plugins and returns the enabled chai object.
 * @return {Function} chai, with plugins enabled
 */
function makeChai() {
  const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  // if setup was successful, return configured chai module
  return chai;
}

/**
 * Copies template directories containing fixtures for testing purposes.
 * @param  {string} fixturesDir template path
 * @return {Boolean}            true if copy succeeded
 */
function copyTpl(fixturesDir) {
  if (typeof (fixturesDir) !== 'string') {
    throw new Error('Testing fixture template path must be a string. Receieved:', typeof (fixturesDir));
  }
  if (!fs.existsSync(fixturesDir)) {
    throw new Error('Texting fixture template path does not exist. Received', fixturesDir);
  }
  if (path.basename(fixturesDir) !== 'fixtures') {
    throw new Error('Testing fixture template must be inside a "fixtures" folder. Received:', fixturesDir);
  }
  // copy directory recursively and signal success
  return ncp(fixturesDir, fixturesDir + '_temp', (err) => { if (err) { throw new Error(err); } return true; });
}

/**
 * Used to clean up fixture files temporarily copied for testing purposes.
 * @param  {string} targetDir path to be deleted
 * @return {Boolean}          true if operation successful
 */
function cleanTpl(fixturesDir) {
  if (typeof (fixturesDir) !== 'string') {
    throw new Error('Testing fixture template path must be a string. Receieved:', typeof (fixturesDir));
  }
  if (path.basename(fixturesDir) !== 'fixtures') {
    throw new Error('Testing fixture template must be inside a "fixtures" folder. Received:', fixturesDir);
  }
  // delete directory recusively and signal success
  rimraf.sync(fixturesDir = '_temp');
  return true;
}

module.exports = {
  makeChai: makeChai,
  copyTpl: copyTpl,
  clean: cleanTpl
};
