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

const assetsJson = require('./assets.json'),
  config = require('./config.json'),
  utils = require('./utils');

const assetsUtils = utils.assets,
  gulpUtils = utils.gulp;

// === SUBTASKS ===

// Installs Sequelize, an ORM
gulp.task('InstallSequelize', (done) => {
  return spawn(gulpUtils.ensureOS('npm'), ['install', '-g', 'sequelize-cli@~2.7.0'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// Installs DocumentationJS, automatic documentation generator
gulp.task('InstallDocumentationJS', (done) => {
  return spawn(gulpUtils.ensureOS('npm'), ['install', '-g', 'documentation'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// Installs Mocha, testing framework for Node
gulp.task('InstallMocha', (done) => {
  return spawn(gulpUtils.ensureOS('npm'), ['install', '-g', 'mocha@~4.0.1'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// Installs Istanbul, a testing coverage library
gulp.task('InstallIstanbul', (done) => {
  return spawn(gulpUtils.ensureOS('npm'), ['install', '-g', 'nyc@>=11.2.1 <11.3'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// installs Protractor, testing framework for Angular
gulp.task('InstallProtractor', (done) => {
  return spawn(gulpUtils.ensureOS('npm'), ['install', '-g', 'protractor@~5.2.1'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// updates the Selenium web driver installed with protractor, used for testing
gulp.task('UpdateSelenium', (done) => {
  return spawn('webdriver-manager', ['update'])
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('exit', () => { done(); });
});

// gathers all external js into the libraray css directory
gulp.task('GatherVendorJS', (done) => {
  return gulp.src(new assetsUtils.collect('js').dependencies)
    .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.js)))
    .on('error', (err) => { console.error(`\n${err}`); return done(); })
    .on('end', () => { done(); });
});

// gathers all external css into the libraray css directory
gulp.task('GatherVendorCSS', (done) => {
  return gulp.src(new assetsUtils.collect('css').dependencies)
    .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.css)))
    .on('error', (err) => { console.error(`\n${err}`); return done(); })
    .on('end', () => { done(); });
});

// gathers the individual i18n localization files
gulp.task('GatherLocalization', (done) => {
  return gulp.src(new assetsUtils.locale().sources())
    .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.locales)))
    .on('error', (err) => { console.error(`\n${err}`); return done(); })
    .on('end', () => { done(); });
});

// installs google fonts and moves the resulting files into the static fonts directory
gulp.task('GatherGoogleFonts', (done) => {
  return gulp.src(path.join(__dirname, assetsJson.vendor.fonts))
    .pipe(googleWebFonts({}))
    .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.fonts)))
    .on('error', (err) => { console.error(`\n${err}`); done(); })
    .on('end', () => { done(); });
});

// run jshint internal source files
gulp.task('JSHint', (done) => {
  // target development js source files
  const target = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.js, '**/*.js');
  // add error handler and reporter and run jshint
	return gulp.src(target)
		.pipe(jshint())
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
		.pipe(jshint.reporter('default'))
      .on('end', () => { done(); });
});

// minifies and concatenates vendor style files
gulp.task('CompileVendorStyles', (done) => {
  const sources = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.css, '**/*.css');
  const destination = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('lib.min.css'))
    .pipe(sourcemaps.write(path.join(destination, assetsJson.dirs.maps)))
    .pipe(gulp.dest(destination))
    .on('end', () => { done(); });
});

// minifies and concatenates vendor style files
gulp.task('CompileInternalStyles', (done) => {
  const sources = [
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.style, assetsJson.dirs.css, '**/*.css'),
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.style, assetsJson.dirs.less, '**/*.less')
  ];
  const destination = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write(path.join(destination, assetsJson.dirs.maps)))
    .pipe(gulp.dest(destination))
    .on('end', () => { done(); });
});

// concatenates and minifies vendor stylesheets and internal css and less
gulp.task('CompileStyles', gulp.series('CompileVendorStyles', 'CompileInternalStyles'));

gulp.task('CompileVendorScripts', (done) => {
  const sources = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.js, '**/*.js');
  const destination = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('lib.min.js'))
    .pipe(sourcemaps.write(path.join(destination, assetsJson.dirs.maps)))
    .pipe(gulp.dest(destination))
    .on('end', () => { done(); });
});

gulp.task('CompileInternalScripts', (done) => {
  const sources = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib, assetsJson.dirs.js, '**/*.js');
  const destination = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist);
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write(path.join(destination, assetsJson.dirs.maps)))
    .pipe(gulp.dest(destination))
    .on('end', () => { done(); });
});

gulp.task('CompileScripts', gulp.series('CompileVendorScripts', 'CompileInternalScripts'));

gulp.task('BuildDocsGeneral', (done) => {
  const sources = path.join(__dirname, 'utils', '**/*.js');
  const destination = path.join(__dirname, 'docs', 'docs', 'general');
  return gulp.src(sources)
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest(destination))
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('end', () => { done(); });
});

gulp.task('BuildDocsServer', (done) => {
  const sources = path.join(__dirname, 'server', '**/*.js');
  const destination = path.join(__dirname, 'docs', 'docs', 'server');
  return gulp.src(sources)
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest(destination))
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('end', () => { done(); });
});

gulp.task('BuildDocsClient', (done) => {
  const sources = path.join(__dirname, 'client', 'js', '**/*.js');
  const destination = path.join(__dirname, 'docs', 'docs', 'client');
  return gulp.src(sources)
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest(destination))
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('end', () => { done(); });
});

// auto-generate markdown documentation from JSdoc code comments
gulp.task('BuildDocs', gulp.series('BuildDocsGeneral', 'BuildDocsServer', 'BuildDocsClient'));

// removes Istanbul's coverage output folder
gulp.task('CleanUpCoverage', (done) => {
  const target = path.join(__dirname, 'coverage');
  gulpUtils.cleanupDir(target);
  done();
});

// removes Istanbul's hidden output folder
gulp.task('CleanUpIstanbul', (done) => {
  const target = path.join(__dirname, '.nyc_output');
  gulpUtils.cleanupDir(target);
  done();
});

// removes all extenal vendor files from the static library
gulp.task('CleanUpLibrary', (done) => {
  const target = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib);
  gulpUtils.cleanupDir(target);
  done();

});

// removes all files minified and compiled for distribution
gulp.task('CleanUpDistribution', (done) => {
  const target = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist);
  gulpUtils.cleanupDir(target);
  done();
});

// removes all npm packages, usually stores in the node_modules directory
gulp.task('CleanUpNPM', (done) => {
  const target = path.join(__dirname, assetsJson.dirs.dependencies);
  gulpUtils.cleanupDir(target);
  done();
});

// creates a database with the named specified in config.json under the current node_env
gulp.task('CreateDB', (done) => {
  try {
    return spawn('createdb', [config[process.env.NODE_ENV || 'development'].database])
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('exit', () => { done(); });
  }
  catch(err) {
    return done();
  }
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('DropDB', (done) => {
  try {
    return spawn('dropdb', [config[process.env.NODE_ENV || 'development'].database])
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('exit', () => { done(); });
  }
  catch(err) {
    return done();
  }
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('MigrateDB', (done) => {
  try {
    spawn('sequelize',  ['db:migrate'])
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('exit', () => { return done(); });
  }
  catch(err) {
    return done();
  }
});

// deletes a database with the named specified in config.json under the current node_env
gulp.task('SeedDB', (done) => {
  try {
    return spawn('sequelize',  ['db:seed:all'])
      .on('error', (err) => { console.error(`\n${err}`); return done(); })
      .on('exit', () => { done(); });
  }
  catch(err) {
    return done();
  }
});

// === END SUBTASKS ===

// === COMPONENT TASKS ===

// installs all necessary global npm packages
gulp.task('InstallGlobals', gulp.series('InstallSequelize', 'InstallDocumentationJS', 'InstallMocha', 'InstallIstanbul', 'InstallProtractor', 'UpdateSelenium'));

// gathers all vendor static packages
gulp.task('GatherStatic', gulp.series('GatherVendorJS', 'GatherVendorCSS', 'GatherLocalization', 'GatherGoogleFonts'));

// compiles source style and script files for production
gulp.task('Compile', gulp.series('CompileStyles', 'CompileScripts', 'BuildDocs'));

// uninstalls all non raw project files, removes the dist, lib, node_modules, coverage, and  .nyc_output directories
gulp.task('Clean', gulp.series('CleanUpCoverage', 'CleanUpIstanbul', 'CleanUpLibrary', 'CleanUpDistribution', 'CleanUpNPM'));

// creates a new db, migrates models and seeds the database to install state
gulp.task('SetupDB', gulp.series('CreateDB', 'MigrateDB', 'SeedDB'));

// drops current database, creates a new one, migrates models and seeds the database to install state
gulp.task('ResetDB', gulp.series('DropDB', 'SetupDB'));

// === END COMPONENT TASKS ===

// === MAIN TASKS ===

// download google web fonts and gather dependencies
gulp.task('SetupDev', gulp.series('InstallGlobals', 'GatherStatic', 'SetupDB'));

// invokes subtasks to perform the entire build process
gulp.task('SetupProduction', gulp.series('SetupDev', 'JSHint', 'Compile'));

// Rebuild whenever project file is modified
gulp.task('Watch', () => { gulp.watch(assetsJson, gulp.series('Compile'));});

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
