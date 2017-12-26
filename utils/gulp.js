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
   * @param  {onError~done}           done                gulp async completion cb
   * @return {[Function]}                                 cb function wrapper to perform on event
   */
  onError(done) {
    return (err) => { console.error(`${err}`); done(); };
  },

  /**
   * This callback signals async completion for gulp tasks
   * @callback onError~done
   * @memberof utils.gulp.onError
   */

  /**
   * Function wrapper for async task completion, returns a callback that displays error and signals async completion
   * @memberof utils.gulp
   * @param  {onExit~done}            done                gulp async completion cb
   * @return {Function}                                   cb function wrapper to perform on event
   */
  onExit(done) {
    return () => { done(); };
  },

  /**
   * This callback signals async completion for gulp tasks
   * @callback onExit~done
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
   * Defines a gulp folder/file deletion task for use in gulp.series(), will skip if not extant
   * @param   {string}          taskname            name of desired gulp task
   * @param   {string}          target              path of folder/file to be deleted
   * @param   {boolean}         [skip_warn=false]   flag to skip warning if file non extant
   * @return  {string}                              unmodified task name
   */
  defineCleanupTask(taskname, target, skip_warn=false) {
    gulp.task(taskname, (done) => {
      if (fs.existsSync(target)) {
        return gulp.src(target, {read: false})
          .pipe(clean())
          .on('error', this.onError(done))
          .on('end', this.onExit(done));
      }
      // if non extant, log warning unless skip_warn is flagged
      if (!skip_warn) {
          console.warn('Directory specified for deletion does not exist:', target);
      }
      done();
      return;
    });
    return taskname;
  }, // defineCleanupTask

  /**
   * Defines a simple gulp copy task, copying all files matching glob pattern(s) to a specified path.
   * @param  {string}                                 taskname      name of desired gulp task
   * @param  {string}                                 sources       glob pattern(s) of desired source files
   * @param  {string}                                 destination   path to copy them
   * @return {string}                                               unmodified task name
   */
  defineCopyTask(taskname, sources, destination) {
    gulp.task(taskname, (done) => {
      return gulp.src(sources)
        .pipe(gulp.dest(destination))
          .on('error', this.onError(done))
          .on('end', this.onExit(done));
    });
    return taskname;
  }, // defineSpawnTask

  /**
   * Defines a spawn task & returns taskname in case called inside gulp.series()
   * @param  {string}                                 taskname      name of desired gulp task
   * @param  {string}                                 command       terminal command to launch
   * @param  {string|string[]}                        params        arguments to pass to command
   * @return {string}                                               unmodified task name
   */
  defineSpawnTask(taskname, command, params) {
    gulp.task(taskname, (done) => {
      // if npm is run, .cmd needs to be appended if in Windows OS
      if (command === 'npm') {
        command = this.ensureOS(command);
      }
      // if a string was passed instead of array, convert to array with string inside
      if (typeof(params) === 'string') {
        params = [params];
      }
      return spawn(command, params)
        .on('error', this.onError(done))
        .on('exit', this.onExit(done));
    });
    return taskname;
  }, // defineSpawnTask

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
  } // defineDocsTask

};

module.exports = ModuleExports;
