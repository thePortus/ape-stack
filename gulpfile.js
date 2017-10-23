const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyJs = require('gulp-uglify');
const uglifyCss = require('gulp-uglifycss');
const plumber = require('gulp-plumber');
const jshint = require('gulp-jshint');
const less = require('gulp-less');
const googleWebFonts = require('gulp-google-webfonts');
const sourcemaps = require('gulp-sourcemaps');

const assetsJson = require('./assets.json');
const assets = require('./utils/assets');

// ===Tasks defined in this file===
//
// - Main Tasks -
// collect
// build
// watch
//
// - Subtasks -
// less
// fonts
// collectStatic
// jshint
// buildAssets
// ================================

// === FUNCTIONS ===

// Gulp plumber error handler
var onError = (err) => {
  console.log(err);
};

// Gulp css/js asset concatenation
var buildAssets = (assetObject) => {
  var uglifier = null;
  var destinationPath = assetObject.target;
  if (assetObject.type === 'css') {
    uglifier = uglifyCss;
  }
  else if (assetObject.type === 'js') {
    uglifier = uglifyJs;
  }
  return gulp.src(assetObject.sources)
    .pipe(sourcemaps.init())
    .pipe(concat('concat.' + assetObject.type))
    .pipe(uglifier({
        compress: {hoist_funs: true}
      }))
    .pipe(rename(assetObject.filename))
    .pipe(gulp.dest(assetObject.target));
};

// === END FUNCTIONS ===


// Setting Default Task
//
// if in production or testing environment, set default gulp task to build
if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production') {
  gulp.task('default', ['build']);
}
// otherwise assume dev environment and set default task to collect static files
else {
  gulp.task('default', ['collect']);
}

// === MAIN TASKS ===

// download google web fonts and gather dependencies
gulp.task('collect', ['fonts', 'collectStatic']);

// invokes subtasks to perform the entire build process
gulp.task('build', ['fonts', 'less', 'jshint', 'buildAssets']);

gulp.task('watch', () => {
	// Rebuild whenever CSS or JS file is modified, run JSHint on javascript
	gulp.watch(assetsJson, ['buildAssets']);
});

// === END MAIN TASKS ===

// === SUBTASKS ===

// download and gather google web fonts as well as generate stylesheet
gulp.task('fonts', function () {
	return gulp.src('./fonts.txt')
		.pipe(googleWebFonts({}))
		.pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, 'fonts')))
		;
	});

// compile less files into css
gulp.task('less', () => {
  var sources = new assets.less().files;
  var destination = path.join(__dirname, assetsJson.dirs.static, 'css');
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(less({
      'paths': [path.join(__dirname, assetsJson.dirs.static, 'less', 'includes')]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination));
});

// collects vendor dependencies from download folder and moves inside static folder
gulp.task('collectStatic', () => {
  const jsCollections = new assets.collect('css');
  const cssCollections = new assets.collect('js');
  return gulp.src(cssCollections.dependencies.concat(jsCollections.dependencies))
    .pipe(gulp.dest(cssCollections.target));
});

// run jshint internal source files
gulp.task('jshint', () => {
  // Running JSHint on development files
	return gulp.src(assetsJson.source.js)
		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// concat and uglify js and (previously compiled) css files
gulp.task('buildAssets', () => {
  buildAssets(new assets.build('css', 'external'));
  buildAssets(new assets.build('css', 'internal'));
  buildAssets(new assets.build('js', 'external'));
  buildAssets(new assets.build('js', 'internal'));

});

// === END SUBTASKS ===
