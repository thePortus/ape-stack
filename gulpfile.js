const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyJs = require('gulp-uglify');
const uglifyCss = require('gulp-uglifycss');
const plumber = require('gulp-plumber');
const jshint = require('gulp-jshint');
const sourcemaps = require('gulp-sourcemaps');

const assetsJson = require('./assets.json');
const assets = require('./server/utils/assets');

gulp.task('default', ['collect']);

gulp.task('collect', () => {
  const jsCollections = new assets.collect('css');
  const cssCollections = new assets.collect('js');
  return gulp.src(cssCollections.dependencies.concat(jsCollections.dependencies))
    .pipe(gulp.dest(cssCollections.target));
});

function buildAssets(assetObject) {
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
}

gulp.task('build', () => {
  buildAssets(new assets.build('css', 'external'));
  buildAssets(new assets.build('css', 'internal'));
  buildAssets(new assets.build('js', 'external'));
  buildAssets(new assets.build('js', 'internal'));

});

/*
function buildAssets(type, category) {
  var uglifier = null;
  var sources = null;
  var filename = null;
  var destinationDir = assets.dirs.dist;
  if (type === 'css') {
    uglifier = uglifyCss;
  }
  else {
    uglifier = uglifyJs;
  }
  if (category === 'dependencies') {
    sources = assets.dependencies(type);
    filename = 'lib.min.' + type;
  }
  else {
    sources = assets.sources(type);
    filename = 'app.min.' + type;
  }
  gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(concat('tempfile'))
    .pipe(uglifier({
        compress: {hoist_funs: true}
      }))
    .pipe(rename(filename))
    .pipe(gulp.dest(path.join(destinationDir)));
}

gulp.task('build', () => {
  // building internal css files
  buildAssets('css', 'dependencies');
  buildAssets('js', 'dependencies');
  buildAssets('css', 'sources');
  buildAssets('js', 'sources');
});
*/

/*

// Gulp plumber error handler
var onError = function(err) {
  console.log(err);
};

gulp.task('jshint', () => {
  // Running JSHint on development files
	return gulp.src(assets.files.js)
		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

*/

/*
gulp.task('watch', () => {
	// Rebuild whenever CSS or JS file is modified, run JSHint on javascript
	gulp.watch(assetsJson, ['buildAssets']);
});
*/
