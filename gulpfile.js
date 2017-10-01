const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyJs = require('gulp-uglify');
const uglifyCss = require('gulp-uglifycss');
const plumber = require('gulp-plumber');
const jshint = require('gulp-jshint');
const sourcemaps = require('gulp-sourcemaps');

const assets = require('./assets.json');

// Gulp plumber error handler
var onError = function(err) {
	console.log(err);
};

function buildAssets(source, uglifier, concatName, uglifyName) {
  // CB function to concatenate & uglify
  return () => {
		var destination = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
    gulp.src(source)
      .pipe(sourcemaps.init())
      .pipe(concat(concatName))
      .pipe(uglifier({
				compress: { hoist_funs: false }
			}))
      .pipe(rename(uglifyName))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(destination));
  };
}

function assetPaths(relativePaths) {
	var fullPaths = [];
	// gets list of relative paths for assets in assets.json and returns them with client dir prepended
	for(var x = 0; x <= relativePaths.length; x += 1) {
		var relativePath = relativePaths[x];
		relativePath = './' + assets.dirs.static + relativePath;
		fullPaths.push(relativePath)
	}
	return fullPaths;
}

gulp.task('default', ['collectStatic', 'jshint', 'build']);

gulp.task('collectStatic', () => {
  /* Moves front end dependencies from the node_modules folder to the client library directory*/
  var destination = path.join('./', assets.dirs.static, assets.dirs.external);
  var source = assets.libSrc.css.concat(assets.libSrc.js);
  gulp.src(source)
    .pipe(gulp.dest(destination));
});

gulp.task('jshint', () => {
	return gulp.src(assets.src.js)
		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', ['buildCssInternal', 'buildCssExternal', 'buildJsInternal', 'buildJsExternal']);

gulp.task('buildCssExternal', buildAssets(assetPaths(assets.files.css.external), uglifyCss, 'lib.concat.css', 'lib.min.css'));

gulp.task('buildCssInternal', buildAssets(assetPaths(assets.files.css.internal), uglifyCss, 'app.concat.css', 'app.min.css'));

gulp.task('buildJsExternal', buildAssets(assetPaths(assets.files.js.external), uglifyJs, 'lib.concat.js', 'lib.min.js'));

gulp.task('buildJsInternal', buildAssets(assetPaths(assets.files.js.internal), uglifyJs, 'app.concat.js', 'app.min.js'));

gulp.task('watch', () => {
	// Rebuild whenever CSS or JS file is modified, run JSHint on javascript
	gulp.watch(assets.src.css, ['buildCssInternal']);
	gulp.watch(assets.src.js, ['jshint', 'buildJsInternal']);
	gulp.watch(assets.libSrc.css, ['buildCssExternal']);
	gulp.watch(assets.libSrc.js, ['jshint', 'buildJsExternal']);
});
