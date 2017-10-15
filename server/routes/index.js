'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const passport = require('passport');

const assets = require('../utils/assets');

router.use(passport.initialize());
router.use(passport.session());

/* Serve basic index page with assets determined by environment */
router.get('/', (req, res, next) => {
  // use assets util to determine which assets used
  var runtimeAssets = {
    'css': new assets.runtime('css').assets,
    'js': new assets.runtime('js').assets
  };
  // Send app index page with assets
  res.render('index', { assets: runtimeAssets });
});

module.exports = router;
