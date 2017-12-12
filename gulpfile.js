/**
 * /gulpfile.js
 * @file
 *
 *
 */

'use strict';

const path = require('path'),
  fs = require('fs'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  plumber = require('gulp-plumber'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  googleWebFonts = require('gulp-google-webfonts'),
  sourcemaps = require('gulp-sourcemaps'),
  spawn = require('child_process').spawn;

const assetsJson = require('./assets.json'),
  config = require('./config.json'),
  assets = require('./utils/assets'),
  utils = require('./utils');

// === FUNCTIONS ===

// Default onExit function for gulp
function onExit(done) {
  done();
}

// Gulp plumber error handler
function onData(data) {
  console.log(`${data}`);
}

// Gulp plumber error handler
function onError(err) {
  console.error(`\n${err}`);
}

// === END FUNCTIONS ===

// === SUBTASKS ===

gulp.task('globals', (done) => {
  spawn('npm', ['install', '-g', 'sequelize-cli@~2.7.0'])
    .stderr.on('data', onError)
    .on('exit', () => {
      spawn('npm', ['install', '-g', 'mocha@~4.0.1'])
        .stderr.on('data', onError)
        .on('exit', () => {
          spawn('npm', ['install', '-g', 'nyc@>=11.2.1 <11.3'])
            .stderr.on('data', onError)
            .on('exit', () => {
              spawn('npm', ['install', '-g', 'protractor@~5.2.1'])
                .stderr.on('data', onError)
                .on('exit', () => {
                  spawn('webdriver-manager', ['update'])
                    .stderr.on('data', onError)
                    .on('exit', () => { done(); });
                }); // webdriver-manager
            }); // protractor
        }); // nyc
    }); // mocha
  done();
});

// collects vendor dependencies from download folder and moves inside static folder
gulp.task('static', (done) => {
  const sources = new assets.collect('css').dependencies.concat(new assets.collect('js').dependencies);
  if (sources.length) {
    // copy css & js to lib files
    return gulp.src(sources)
      .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib)))
      .on('end', () => {
        // then copy locale assets
        const localeAssets = new assets.locale();
        return gulp.src(localeAssets.sources())
          .pipe(gulp.dest(localeAssets.target))
          .on('end', () => {
            // then install google fonts as specified in fonts.txt
            return gulp.src('./fonts.txt')
          		.pipe(googleWebFonts({}))
          		.pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, 'fonts')))
                .on('end', () => { done(); });
          });
      });
  }
  return true;
});

// run jshint internal source files
gulp.task('jshint', (done) => {
  // target development js source files
  const target = path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.js, '**/*.js');
  // add error handler and reporter and run jshint
	return gulp.src(target)
		.pipe(jshint())
      .on('error', onError)
		.pipe(jshint.reporter('default'))
      .on('end', () => { done(); });
});

// compile less files into css
gulp.task('compile', (done) => {
  const lessSources = new assets.less().files;
  if (lessSources.length) {
    // compile less and save css in static dir
    return gulp.src(lessSources)
      .pipe(sourcemaps.init())
      .pipe(less({
        'paths': [path.join(__dirname, assetsJson.dirs.static, 'less', 'includes')]
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.join(__dirname, assetsJson.dirs.static, 'css')))
        .on('end', () => {
          const assetConfigs = [
            { 'type': 'css', 'category': 'external' },
            { 'type': 'css', 'category': 'internal' },
            { 'type': 'js', 'category': 'external' },
            { 'type': 'js', 'category': 'internal' }
          ];
          // then concatenate and uglify vendor and source css & js files for distribution
          for(let x = 0; x < assetConfigs.length; x += 1) {
            let assetsToBuild = new assets.build(assetConfigs[x].type, assetConfigs[x].category);
              // TODO: use gulp.series with anonymous functions instead of this mess?
              utils.gulp.buildAssets(assetsToBuild);
          }
          done();
        }); // build less
  }
});

// cleans up all folders installed or built by this application
gulp.task('clean', (done) => {
  const targetPaths = [
    // npm modules
    path.join(__dirname, assetsJson.dirs.dependencies),
    // font libraries
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.fonts),
    // static libraries
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.lib),
    // built css files
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.css),
    // compiled js
    path.join(__dirname, assetsJson.dirs.static, assetsJson.dirs.dist),
    // istanbul
    path.join(__dirname, '.nyc_output'),
    // coverage
    path.join(__dirname, 'coverage')
  ];
  // TODO: ADD STUFF TO CLEAN THE PATHS HERE
});

// creates a database with the named specified in config.json under the current node_env
gulp.task('createDatabase', (done) => {
  let node_env = process.env.NODE_ENV || 'development';
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
    'globals',
    'static',
    'setupDatabase'
  )
);

// invokes subtasks to perform the entire build process
gulp.task('setupProduction',
  gulp.series(
    'setupDev',
//    'jshint',
    'compile'
  )
);

gulp.task('watch', () => {
	// Rebuild whenever project file is modified
	gulp.watch(assetsJson, gulp.series('build'));
});

// resets to pre-install state, with only repo files left
// drops the database, deletes npm modules, libraries, and build files
gulp.task('remove',
  gulp.series(
    'clean',
    'dropDatabase'
  )
);

// === END MAIN TASKS ===


// Setting based on node environment
// if in production env, switch to full setup, compiling and gathering
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.series('setupProduction'));
}
// otherwise assume a dev env
else {
  gulp.task('default', gulp.series('setupDev'));
}
