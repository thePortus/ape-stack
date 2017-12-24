'use strict';

const express = require('express'),
  path = require('path');

const router = express.Router();

const assetsJson = require('../../assets.json'),
  assets = require('../../utils').assets;

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
