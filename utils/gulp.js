/**
 * @file /utils/gulp.js
 * @module gulp
 * @memberof utils
 * @description Functions used by the gulp tasks
 */

'use strict';

const fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  gulpDocumentation = require('gulp-documentation'),
  clean = require('gulp-clean'),
  spawn = require('child_process').spawn;

const ModuleExports = {

  /**
   * Function wrapper for async error handling, returns a callback that displays error and signals async completion
   * @memberof utils.gulp
   * @param  {utils.gulp.onError~done}           done        gulp async completion cb
   * @return {[Function]}                                 cb function wrapper to perform on event
   */
  onError(done) {
    return (err) => { console.error(`${err}`); done(); };
  },

  /**
   * This callback signals async completion for gulp tasks
   * @callback utils.gulp.onError~done
   * @memberof utils.gulp.onError
   */

  /**
   * Function wrapper for async task completion, returns a callback that displays error and signals async completion
   * @memberof utils.gulp
   * @param  {utils.gulp.onExit~done}            done        gulp async completion cb
   * @return {Function}                                   cb function wrapper to perform on event
   */
  onExit(done) {
    return () => { done(); };
  },

  /**
   * This callback signals async completion for gulp tasks
   * @callback utils.gulp.onExit~done
   * @memberof utils.gulp.onExit
   */

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
  }, // cleanupDir

  /**
   * Defines a doc build task & returns taskname in case called inside gulp.series()
   * @memberof  utils.gulp
   * @param     {string}      taskname            dynamic gulp task name
   * @param     {string[]}    sources             glob pattern of desired source files
   * @param     {string}      outputFilename      name of output markdown file
   * @return    {string}                          unmodified task name
   */
  defineDocsTask(taskname, sources, outputFilename) {
    gulp.task(taskname, (done) => {
      const destination = path.join(__dirname, '..', 'docs');
      return gulp.src(sources)
        .pipe(gulpDocumentation('md'))
        .pipe(rename(outputFilename))
        .pipe(gulp.dest(destination))
          .on('error', this.onError(done))
          .on('end', this.onExit(done));
    });
    return taskname;
  }, // defineDocsTask

  /**
   * Defines a spawn task & returns taskname in case called inside gulp.series()
   * @param  {string}                                 taskname      name of desired gulp task
   * @param  {string}                                 command       terminal command to launch
   * @param  {string[]}                               params        arguments to pass to command
   * @param  {defineSpawnTask~onExit}      [onExit]      cb performed on task finish
   * @param  {defineSpawnTask~onError}     [onError]     cb performed on task error
   * @return {string}                                               unmodified task name
   */
  defineSpawnTask(taskname, command, params, onExit, onError) {
    gulp.task(taskname, (done) => {
      // set call back functions, either to passed CBs, or default to this module's onExit/onError
      const exitCB = typeof(onExit) !== 'undefined' ? onExit : this.onExit;
      const errorCB = typeof(onError) !== 'undefined' ? onError : this.onError;
      // if npm is run, .cmd needs to be appended if in Windows OS
      if (command === 'npm') {
        command = this.ensureOS(command);
      }
      // if a string was passed instead of array, convert to array with string inside
      if (typeof(params) === 'string') {
        params = [params];
      }
      return spawn(command, params)
        .on('error', errorCB(done))
        .on('exit', exitCB(done));
    });
    return taskname;
  } // defineSpawnTask

  /**
   * Optional callback function wrapper, returns another callback which handles error then calls done to signal async completion
   * @callback  defineSpawnTask~onError
   * @memberof  utils.gulp.defineSpawnTask
   * @param     {Function}                               done         gulp async completion function
   * @returns   {Function}
   */

   /**
    * Optional callback function wrapper, returns another callback which performs desired tasks then calls done to signal async completion
    * @callback  defineSpawnTask~onExit
    * @memberof  utils.gulp.defineSpawnTask
    * @param     {Function}                               done         gulp async completion function
    * @returns   {Function}
    */

};

module.exports = ModuleExports;
