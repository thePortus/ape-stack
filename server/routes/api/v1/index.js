'use strict';

const express = require('express'),
  passport = require('passport');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

// serve basic api index page */
router.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to the APE-Stack API Sitemap.'
  });
});

// set api subrouters
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/roles', require('./roles'));

module.exports = router;
