/**
 * /gulpfile.js
 * @file
 *
 * ===Tasks defined in this file===
 *
 * - Main Tasks -
 * setup
 * build
 * watch
 * clean
 * remove
 * reset
 *
 * - Subtasks -
 * less
 * fonts
 * collectStatic
 * jshint
 * buildAssets
 * cleanNodeModules
 * cleanFontFiles
 * cleanLibFiles
 * cleanBuildFiles
 * cleanTestFiles
 * cleanCoverageFiles
 * buildSubDependencies
 * resetDatabase
 * createDatabase
 * dropDatabase
 * migrateDatabase
 * seedDatabase
 * ================================
 */

'use strict';

const path = require('path'),
  fs = require('fs'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  uglifyJs = require('gulp-uglify'),
  uglifyCss = require('gulp-uglifycss'),
  plumber = require('gulp-plumber'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  googleWebFonts = require('gulp-google-webfonts'),
  sourcemaps = require('gulp-sourcemaps'),
  spawn = require('child_process').spawn;

const assetsJson = require('./assets.json'),
  config = require('./config.json'),
  assets = require('./utils/assets');

// === FUNCTIONS ===

// Default onExit function for gulp
function onExit(done) {
  done();
}

// Gulp plumber error handler
function onError(err) {
  console.log(err.toString());
}

// Gulp css/js asset concatenation
function buildAssets(assetObject) {
  let uglifier = null;
  let destinationPath = assetObject.target;
  if (assetObject.type === 'css') {
    uglifier = uglifyCss;
  }
  else if (assetObject.type === 'js') {
    uglifier = uglifyJs;
  }
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
}

// Gulp directory/file cleanup, skips if not present
function cleanupPath(done, target) {
  if (fs.existsSync(target)) {
    return gulp.src(target, {read: false}).pipe(clean()).on('error', onError).on('end', () => { done(); });
  }
  done();
}

// === END FUNCTIONS ===

// === SUBTASKS ===

gulp.task('installGlobals', (done) => {
  const shell = spawn('npm', ['install', '-g', 'nyc@">=11.2.1 <11.3"']);
  shell.on('exit', () => {
    const subshell_1 = spawn('npm', ['install', '-g', 'sequelize-cli@"^2.7.0"']);
    subshell_1.on('exit', () => { return true; });
  });
  done();
});

// download and gather google web fonts as well as generate stylesheet
gulp.task('installGoogleFonts', function () {
	return gulp.src('./fonts.txt')
		.pipe(googleWebFonts({}))
		.pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, 'fonts')));
});

// gathers angular i18n locale libraries into static directory
gulp.task('copyLocalesToStatic', function () {
  const localeAssets = new assets.locale();
  return gulp.src(localeAssets.sources())
    .pipe(gulp.dest(localeAssets.target));
});

// collects vendor dependencies from download folder and moves inside static folder
gulp.task('copyCssJsToStatic', () => {
  const sources = new assets.collect('css').dependencies.concat(new assets.collect('js').dependencies);
  if (sources.length) {
    return gulp.src(sources)
      .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib)));
  }
  console.log('No CSS/JS files found to compile');
  return true;
});

// gathers CSS, JS, and i18n to static folder
gulp.task('collectStatic', gulp.series('copyCssJsToStatic', 'copyLocalesToStatic'));

// compile less files into css
gulp.task('compileLessToCSS', () => {
  const sources = new assets.less().files;
  const destination = path.join(__dirname, assetsJson.dirs.static, 'css');
  if (sources.length) {
    return gulp.src(sources)
      .pipe(sourcemaps.init())
      .pipe(less({
        'paths': [path.join(__dirname, assetsJson.dirs.static, 'less', 'includes')]
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(destination));
  }
  console.log('No LESS files found to compile');
  return true;
});

// run jshint internal source files
gulp.task('jsHintOnSourceFiles', () => {
  // target development js source files
  const target = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.js, '**/*.js');
  // add error handler and reporter and run jshint
	return gulp.src(target)
		.pipe(jshint())
    .on('error', onError)
		.pipe(jshint.reporter('default'));
});

// concat and uglify js and (previously compiled) css files
gulp.task('compileDistributionCssJS', (done) => {
  buildAssets(new assets.build('css', 'external'));
  buildAssets(new assets.build('css', 'internal'));
  buildAssets(new assets.build('js', 'external'));
  buildAssets(new assets.build('js', 'internal'));
  done();
});

// deletes the node module depenency folder
gulp.task('cleanNodeModules', (done) => {
  return cleanupPath(done, path.join(__dirname, assetsJson.dirs.dependencies));
});

// deletes the font libraries folder
gulp.task('cleanFontFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.fonts));
});

// deletes the development library (lib) folder
gulp.task('cleanLibFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib));
});

// deletes compiled CSS files created by less
gulp.task('cleanLessFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.css));
});

// deletes the production build (dist) folder
gulp.task('cleanBuildFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist));
});

// deletes testing and coverage files
gulp.task('cleanTestFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, '.nyc_output'));
});

// deletes testing and coverage files
gulp.task('cleanCoverageFiles', (done) => {
  return cleanupPath(done, path.join(__dirname, 'coverage'));
});

gulp.task('moveToSubDependencyModule', (done) => {
  const source = path.join(__dirname, assetsJson.dirs.dependencies, 'angular-translate-storage-cookie');
  const shell = spawn('cd', [source]);
  shell.stderr.on('data', onError);
  shell.on('exit', () => { done(); });
});

gulp.task('installModuleDependencies', (done) => {
  const shell = spawn('npm', ['install']);
  shell.stderr.on('data', onError);
  shell.on('exit', () => { done(); });
});

gulp.task('moveToProjectRoot', (done) => {
  const shell = spawn('cd', [__dirname]);
  shell.stderr.on('data', onError);
  shell.on('exit', () => { done(); });
});

// builds and moves certain necessary sub-dependencies
// created because angular-translate-storage-cookie only works with the version of angular-cookies in its package.json. But, it can be modified to work with multiple dependencies
gulp.task('installNodeSubDependency',
  gulp.series(
    'moveToSubDependencyModule',
    'installModuleDependencies',
    'moveToProjectRoot'
  )
);

// creates a database with the named specified in config.json under the current node_env
gulp.task('createDatabase', (done) => {
  const shell = spawn('createdb', [config[process.env.NODE_ENV].database]);
  shell.stderr.on('data', (err) => {
    done();
    return true;
  });
  shell.on('exit', () => { done(); });
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('dropDatabase', (done) => {
  const shell = spawn('dropdb', [config[process.env.NODE_ENV].database]);
  shell.stderr.on('data', (err) => {
    done();
    return true;
  });
  shell.on('exit', () => { done(); });
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('migrateDatabase', (done) => {
  const shell = spawn('sequelize', ['db:migrate']);
  shell.stderr.on('data', (err) => {
    done();
    return true;
  });
  shell.on('exit', () => { done(); });
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('seedDatabase', (done) => {
  const shell = spawn('sequelize', ['db:seed:all']);
  shell.stderr.on('data', (err) => {
    done();
    return true;
  });
  shell.on('exit', () => { done(); });
});

// creates a new db, migrates models and seeds the database to install state
gulp.task('setupDatabase',
  gulp.series(
    'createDatabase',
    'migrateDatabase',
    'seedDatabase'
  )
);

// drops current database, creates a new one, migrates models and seeds the database to install state
gulp.task('resetDatabase',
  gulp.series(
    'dropDatabase',
    'setupDatabase'
  )
);

// === END SUBTASKS ===

// === MAIN TASKS ===


// download google web fonts and gather dependencies
gulp.task('setupDev',
  gulp.series(
    'installGlobals',
    'installNodeSubDependency',
    'installGoogleFonts',
    'collectStatic',
    'setupDatabase'
  )
);

// invokes subtasks to perform the entire build process
gulp.task('setupProduction',
  gulp.series(
    'setupDev',
    'compileLessToCSS',
    'jsHintOnSourceFiles',
    'compileDistributionCssJS'
  )
);

gulp.task('watch', () => {
	// Rebuild whenever project file is modified
	gulp.watch(assetsJson, gulp.series('build'));
});

// wipes all libraries and build files, but leaves the database and npm dependencies in place
gulp.task('clean',
  gulp.series(
    'cleanFontFiles',
    'cleanLibFiles',
    'cleanLessFiles',
    'cleanBuildFiles',
    'cleanTestFiles',
    'cleanCoverageFiles'
  )
);

// resets to pre-install state, with only repo files left
// drops the database, deletes npm modules, libraries, and build files
gulp.task('remove',
  gulp.series(
    'clean',
    'dropDatabase',
    'cleanNodeModules'
  )
);

// === END MAIN TASKS ===

// Setting Default Task
//
// if in production or testing environment, set default gulp task to build
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.series('setupProduction'));
}
// otherwise assume dev environment and set default task to collect static files
else {
  gulp.task('default', gulp.series('setupDev'));
}
