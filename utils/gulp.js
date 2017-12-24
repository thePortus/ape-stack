/**
 * @file /utils/gulp.js
 * @module gulp
 * @memberof utils
 * @description Functions used by the gulpfile
 */

'use strict';

const fs = require('fs'),
  gulp = require('gulp'),
  clean = require('gulp-clean');

const ModuleExports = {
  /**
   * ensureOS -Checks if OS is Windows or not, if so adds .cmd to command. Used when spawning processes to install npm packages.
   * @memberof utils.gulp
   * @param  {string}     command     shell command
   * @return {string}                   altered (or unchanged) shell command
   */
  ensureOS(command) {
    if (/^win/.test(process.platform)) {
      return command + '.cmd';
    }
    return command;
  }, // ensureOS

  /**
   * cleanupDir - For asynchonous cleanup, checks if dir exists firsts, then deletes it if so.
   *
   * @memberof utils.gulp
   * @param  {string}       target     target directory to be removed
   */
  cleanupDir(target) {
    // only proceed if directory exists
    if (fs.existsSync(target)) {
      try {
        return gulp.src(target, {read: false})
          .pipe(clean())
          .on('error', (err) => { console.error(`\n${err}`); })
          .on('end', () => {});
      }
      catch(err) {
        console.error(`\n${err}`);
        return err;
      }
    }
  } // cleanupDir

};

module.exports = ModuleExports;
