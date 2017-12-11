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
  throw new Error(err.toString());
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
  return false;
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

let runSpawnCommand = (command, args, done) => {
  return spawn(command, args)
    .stderr.on('data', onError)
    .on('exit', onExit(done));
};

gulp.task('installSequelizeCLI', (done) => {runSpawnCommand('npm', ['install', '-g', 'sequelize-cli@~2.7.0'], done);});
gulp.task('installMocha', (done) => {runSpawnCommand('npm', ['install', '-g', 'mocha@~4.0.1'], done);});
gulp.task('installIstanbul', (done) => {runSpawnCommand('npm', ['install', '-g', 'nyc@>=11.2.1 <11.3'], done);});
gulp.task('installProtractor', (done) => {runSpawnCommand('npm', ['install', '-g', 'protractor@~5.2.1'], done);});
gulp.task('updateSeleniumWebDriver', (done) => {runSpawnCommand('webdriver-manager', ['updated'], done);});

gulp.task('installGlobals', gulp.series(
  'installSequelizeCLI',
  'installMocha',
  'installIstanbul',
  'installProtractor',
  'updateSeleniumWebDriver'
));

/*
// install sequelize ORM
gulp.task('installGlobals', (done) => {
  spawn('npm', ['install', '-g', 'sequelize-cli@~2.7.0'])
    .stderr.on('data', onError)
    .on('exit', () => {
      // install mocha test package
      spawn('npm', ['install', '-g', 'mocha@~4.0.1'])
        .stderr.on('data', onError)
        .on('exit', () => {
          // install istanbul coverage
          spawn('npm', ['install', '-g', 'nyc@>=11.2.1 <11.3'])
            .stderr.on('data', onError)
            .on('exit', () => {
              // install protractor angular test package
              spawn('npm', ['install', '-g', 'protractor@~5.2.1'])
                .stderr.on('data', onError)
                .on('exit', () => {
                  // update selenium web driver
                  spawn('webdriver-manager', ['updated'])
                    .stderr.on('data', onError)
                    .on('exit', () => { done(); });
                  done();
                }); // selenium
              done();
            }); // protractor
          done();
        }); // istanbul
      done();
    }); // mocha
});
*/

// collects vendor dependencies from download folder and moves inside static folder
gulp.task('collectStatic', (done) => {
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
gulp.task('jsHintOnSourceFiles', (done) => {
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
            let builtAssets = new assets.build(assetConfigs[x].type, assetConfigs[x].category);
            // TODO: use gulp.series with anonymous functions instead of this mess?
          }

          done();
        }); // build less
  }
});

// deletes the font libraries folder
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
    'installGlobals',
    'collectStatic',
    'setupDatabase'
  )
);

// invokes subtasks to perform the entire build process
gulp.task('setupProduction',
  gulp.series(
    'setupDev',
//    'jsHintOnSourceFiles',
    'compile'
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


// Setting based on node environment
// if in production env, switch to full setup, compiling and gathering
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.series('setupProduction'));
}
// otherwise assume a dev env
else {
  gulp.task('default', gulp.series('setupDev'));
}
