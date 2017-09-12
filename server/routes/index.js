'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const passport = require('passport');

const assets = require('../../assets.json');

router.use(passport.initialize());
router.use(passport.session());

/* Serve basic index page with assets determined by environment */
router.get('/', (req, res, next) => {
  var assetPaths = {
    'css': [],
    'js': []
  };
  var environment = process.env.NODE_ENV;
  if (environment === 'production' || environment === 'testing') {
    assetPaths.css = ['/dist/lib.min.css', '/dist/app.min.css'];
    assetPaths.js = ['/dist/lib.min.js', '/dist/app.min.js'];
  }
  else {
    assetPaths.css = assets.files.css.external.concat(assets.files.css.internal);
    assetPaths.js = assets.files.js.external.concat(assets.files.js.internal);
  }
  // Send app index page
  res.render('index', { assets: assetPaths });
});

module.exports = router;
