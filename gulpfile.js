'use strict';

const path = require('path'),
  fs = require('fs'),
  glob = require('glob'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  jshint = require('gulp-jshint'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  cleanCSS = require('gulp-clean-css'),
  googleWebFonts = require('gulp-google-webfonts'),
  gulpDocumentation = require('gulp-documentation'),
  sourcemaps = require('gulp-sourcemaps'),
  spawn = require('child_process').spawn;

const utils = require('./utils'),
  assets = require('./assets.json'),
  config = require('./config.json');

/* === SUBTASKS === */

gulp.task('InstallGlobals', gulp.series(
  utils.gulp.defineSpawnTask('InstallGlobals - Sequelize', 'npm', ['install', '-g', 'sequelize-cli@~2.7.0']),
  utils.gulp.defineSpawnTask('InstallGlobals - DocumentationJS', 'npm', ['install', '-g', 'documentation']),
  utils.gulp.defineSpawnTask('InstallGlobals - Mocha', 'npm', ['install', '-g', 'mocha@~4.0.1']),
  utils.gulp.defineSpawnTask('InstallGlobals - Instanbul', 'npm', ['install', '-g', 'nyc@>=11.2.1 <11.3']),
  utils.gulp.defineSpawnTask('InstallGlobals - Protractor', 'npm', ['install', '-g', 'protractor@~5.2.1']),
  utils.gulp.defineSpawnTask('InstallGlobals - Selenium', 'webdriver-manager', ['update'])
));

// installs google fonts and moves the resulting files into the static fonts directory
gulp.task('GatherGoogleFonts', (done) => {
  const source = path.join(__dirname, assets.vendor.fonts);
  const destination = path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.css);
  return gulp.src(source)
    .pipe(googleWebFonts({}))
    .pipe(gulp.dest(destination))
      .on('error', utils.gulp.onError(done))
      .on('end', utils.gulp.onExit(done));
});

// gathers all external static files
gulp.task('GatherStatic', gulp.series(
  utils.gulp.defineCopyTask(
    'GatherStatic - Vendor JS',
    new utils.assets.collect('js').dependencies,
    path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.scripts)
  ),
  utils.gulp.defineCopyTask(
    'GatherStatic - Vendor CSS',
    new utils.assets.collect('css').dependencies,
    path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.css)
  ),
  utils.gulp.defineCopyTask(
    'GatherStatic - i18n Localization',
    new utils.assets.locale().sources(),
    path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.locales)
  ),
  'GatherGoogleFonts'
));

// run jshint internal source files
gulp.task('JSHint', (done) => {
  // target development js source files
  const target = path.join(__dirname, assets.dirs.static, assets.dirs.scripts, '**/*.js');
  // add error handler and reporter and run jshint
	return gulp.src(target)
		.pipe(jshint())
      .on('error', utils.gulp.onError(done))
		.pipe(jshint.reporter('default'))
      .on('end', utils.gulp.onExit(done));
});

// minifies and concatenates vendor style files
gulp.task('CompileVendorStyles', (done) => {
  const sources = path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.css, '**/*.css');
  const destination = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('lib.min.css'))
    .pipe(sourcemaps.write(path.join(destination, assets.dirs.maps)))
    .pipe(gulp.dest(destination))
      .on('end', utils.gulp.onExit(done));
});

// minifies and concatenates vendor style files
gulp.task('CompileInternalStyles', (done) => {
  const sources = [
    path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.styles, assets.dirs.css, '**/*.css'),
    path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.styles, assets.dirs.less, '**/*.less')
  ];
  const destination = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write(path.join(destination, assets.dirs.maps)))
    .pipe(gulp.dest(destination))
      .on('end', utils.gulp.onExit(done));
});

// concatenates and minifies vendor stylesheets and internal css and less
gulp.task('CompileStyles', gulp.series('CompileVendorStyles', 'CompileInternalStyles'));

gulp.task('CompileVendorScripts', (done) => {
  const sources = path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.scripts, '**/*.js');
  const destination = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('lib.min.js'))
    .pipe(sourcemaps.write(path.join(destination, assets.dirs.maps)))
    .pipe(gulp.dest(destination))
      .on('end', utils.gulp.onExit(done));
});

gulp.task('CompileInternalScripts', (done) => {
  const sources = path.join(__dirname, assets.dirs.static, assets.dirs.lib, assets.dirs.scripts, '**/*.js');
  const destination = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write(path.join(destination, assets.dirs.maps)))
    .pipe(gulp.dest(destination))
      .on('end', utils.gulp.onExit(done));
});

gulp.task('CompileScripts', gulp.series('CompileVendorScripts', 'CompileInternalScripts'));

// dynamically define gulp tasks to build different documentation segments
gulp.task('BuildDocs', gulp.series(
  utils.gulp.defineDocsTask('BuildDocs - Utilities', path.join(__dirname, 'utils', '**/*.js'), 'utilities.md'),
  utils.gulp.defineDocsTask('BuildDocs - Server', path.join(__dirname, 'server', '**/*.js'), 'server.md'),
  utils.gulp.defineDocsTask('BuildDocs - Client', path.join(__dirname, assets.dirs.static, assets.dirs.scripts, '**/*.js'), 'client.md')
));

// removes coverage and .nyc_output folders
gulp.task('Cleanup - Testing Output', gulp.series(
    utils.gulp.defineCleanupTask('Cleanup - Coverage Files', path.join(__dirname, 'coverage'), true),
    utils.gulp.defineCleanupTask('Cleanup - Istanbul Files', path.join(__dirname, '.nyc_output'), true)
));

gulp.task('CleanupTest', gulp.series(
    'Cleanup - Testing Output'
));

// removes all extenal vendor files from the static library
gulp.task('CleanUpLibrary', (done) => {
  const target = path.join(__dirname, assets.dirs.static, assets.dirs.lib);
  utils.gulp.cleanupDir(target);
  done();

});

// removes all files minified and compiled for distribution
gulp.task('CleanUpDistribution', (done) => {
  const target = path.join(__dirname, assets.dirs.static, assets.dirs.dist);
  utils.gulp.cleanupDir(target);
  done();
});

// removes all npm packages, usually stores in the node_modules directory
gulp.task('CleanUpNPM', (done) => {
  const target = path.join(__dirname, assets.dirs.dependencies);
  utils.gulp.cleanupDir(target);
  done();
});

// creates a new db, migrates models and seeds the database to install state
gulp.task('SetupDB', gulp.series(
  utils.gulp.defineSpawnTask('SetupDB - Create Database', 'createdb', [config[process.env.NODE_ENV || 'development'].database]),
  utils.gulp.defineSpawnTask('SetupDB - Migrate Models', 'sequelize', ['db:migrate']),
  utils.gulp.defineSpawnTask('SetupDB - Seed Data', 'sequelize', ['db:seed:all'])
));

// deletes a database with the named specified in config.json under the current node_env
gulp.task('DropDB', gulp.series(
  utils.gulp.defineSpawnTask('ResetDB - Drop Database', 'dropdb', [config[process.env.NODE_ENV || 'development'].database])
));

// drops current database, creates a new one, migrates models and seeds the database to install state
gulp.task('ResetDB', gulp.series(
  'DropDB',
  'SetupDB'
));

/* === END SUBTASKS === */

// === COMPONENT TASKS ===
// compiles source style and script files for production
gulp.task('Compile', gulp.series('CompileStyles', 'CompileScripts', 'BuildDocs'));

// uninstalls all non raw project files, removes the dist, lib, node_modules, coverage, and  .nyc_output directories
gulp.task('Clean', gulp.series('CleanUpLibrary', 'CleanUpDistribution', 'CleanUpNPM'));

// === END COMPONENT TASKS ===

// === MAIN TASKS ===

// download google web fonts and gather dependencies
gulp.task('SetupDev', gulp.series('InstallGlobals', 'GatherStatic', 'SetupDB'));

// invokes subtasks to perform the entire build process
gulp.task('SetupProduction', gulp.series('SetupDev', 'JSHint', 'Compile'));

// Rebuild whenever project file is modified
gulp.task('Watch', () => { gulp.watch(assets, gulp.series('Compile'));});

// resets to pre-install state, with only repo files left
// drops the database, deletes npm modules, libraries, and build files
gulp.task('Remove', gulp.series('Clean', 'DropDB'));

// === END MAIN TASKS ===

// Setting default task based on node environment
// if in production env, switch to full setup, compiling and gathering
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.series('SetupProduction'));
}
// otherwise assume a dev env
else {
  gulp.task('default', gulp.series('SetupDev'));
}
