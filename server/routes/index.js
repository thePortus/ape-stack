'use strict';

const express = require('express'),
  path = require('path');

const router = express.Router();

const staticAssets = require('../utils').staticAssets;

/* Serve basic index page with assets determined by environment */
router.get('/', (req, res, next) => {
  // use assets util to determine which assets used
  var runtimeAssets = {
    'styles': staticAssets.styles(),
    'scripts': staticAssets.scripts()
  };
  // Send app index page with assets
  res.render('index', { assets: runtimeAssets });
});

/* Error page example template, used for testing changes to error.ejs */
router.get('/error', (req, res, next) => {
  res.render('error', { error: { message: 'There is no error, this is merely a sample page.' } });
});

module.exports = router;
