/**
 * @file /utils/env.js
 * @module env
 * @memberof utils
 * @description Functions to determine the current node environment and env variables
 */

'use strict';

module.exports = {

  /**
   * currentEnv - State of the current node env (based on the NODE_ENV environment variable)
   * @memberof utils.env
   * @return {string}  current node environment
   */
  currentEnv() {
    return process.env.NODE_ENV;
  }, // currentEnv

  /**
   * isDevEnv - Determines if development env is active. Assumes dev unless NODE_ENV is 'production' or 'test'
   * @memberof utils.env
   * @return    {bool}       true if currently in dev env
   */
  isDevEnv() {
    return !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test');
  }, // isDevEnv

  /**
   * currentEnvVar - Either returns value of specified env variable or,
   * if none was passed, returns a list of all current env variable names.
   * @memberof utils.env
   * @param   {string}         varName     Name of env variable to check
   * @return  {*|string[]}                 Value of env variable or list of current env variables
   * @throws                               Will throw error if varName is a non-string
   */
  currentEnvVar(varName) {
    // if no env variable name passed, return list of current env variable names
    if (typeof(varName) === 'undefined') {
      return Object.keys(process.env);
    }
    // if name passed but not a string, throw error
    if (typeof(varName) !== 'undefined' && typeof(varName) !== 'string') {
      throw 'Argument varName was non-string, varName must be a string or undefined';
    }
    // if name passed but is not a current env var return undefined;
    if (!process.env.hasOwnProperty(varName)) {
      return;
    }
    // return current value of passed env var
    return process.env[varName];
  } // currentEnvVar

};
