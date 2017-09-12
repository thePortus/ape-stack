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
gulp.task('buildCssInternal', buildAssets(assets.src.css, uglifyCss, 'app.concat.css', 'app.min.css'));
gulp.task('buildCssExternal', buildAssets(assets.libSrc.css, uglifyCss, 'lib.concat.css', 'lib.min.css'));
gulp.task('buildJsInternal', buildAssets(assets.src.js, uglifyJs, 'app.concat.js', 'app.min.js'));
gulp.task('buildJsExternal', buildAssets(assets.libSrc.js, uglifyJs, 'lib.concat.js', 'lib.min.js'));

gulp.task('watch', () => {
	// Rebuild whenever CSS or JS file is modified, run JSHint on javascript
	gulp.watch(assets.src.css, ['buildCssInternal']);
	gulp.watch(assets.src.js, ['jshint', 'buildJsInternal']);
	gulp.watch(assets.libSrc.css, ['buildCssExternal']);
	gulp.watch(assets.libSrc.js, ['jshint', 'buildJsExternal']);
});
