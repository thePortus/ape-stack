'use strict';

const express = require('express'),
  path = require('path'),
  passport = require('passport');

const assets = require('../../utils/assets'),
  apiIndex = require('./api/index.js');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

/* Serve basic index page with assets determined by environment */
router.get('/', (req, res, next) => {
  // use assets util to determine which assets used
  var runtimeAssets = {
    'css': new assets.runtime('css').assets,
    'less': new assets.runtime('less').assets,
    'js': new assets.runtime('js').assets
  };
  // Send app index page with assets
  res.render('index', { assets: runtimeAssets });
});

module.exports = router;
