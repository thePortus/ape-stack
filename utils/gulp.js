/**
* @file
* /sever/utils/gulp.js
*
* Different utility functions required by gulpfile.js are stored here
* in order to keep the gulpfile clean and readable
*
* David J. Thomas, copyright © 2017
*   thePortus.com
*/

"use strict";

const gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglifyJs = require('gulp-uglify'),
  uglifyCss = require('gulp-uglifycss'),
  sourcemaps = require('gulp-sourcemaps');

// Gulp css/js asset concatenation
// receives an assetObject, specifying whether css or jss dependencies
// and whether external or internal, and a path. Uses that to concatenate
// and uglify and move into the distribution path
function buildAssets(assetObject) {
  let uglifier = null;
  let destinationPath = assetObject.target;
  if (assetObject.type === 'css') {
    uglifier = uglifyCss;
  }
  else if (assetObject.type === 'js') {
    uglifier = uglifyJs;
  }
  console.log(assetObject.sources);
  if (assetObject.sources.length) {
    return gulp.src(assetObject.sources)
      .pipe(sourcemaps.init())
      .pipe(concat('concat.' + assetObject.type))
      .pipe(uglifier({
          compress: {hoist_funs: true}
        }))
      .pipe(rename(assetObject.filename))
      .pipe(gulp.dest(assetObject.target));
  }
  return false;
}

module.exports = {
  'buildAssets': buildAssets
};
