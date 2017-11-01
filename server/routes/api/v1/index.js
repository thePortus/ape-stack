'use strict';

const express = require('express'),
  path = require('path'),
  passport = require('passport');

const users = require('./users'),
  auth = require('./auth');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

// serve basic api index page */
router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the APE API, v1',
    routes: ['auth', 'users']
  }));

// set api subrouters
router.get('/users', users);
router.get('/auth', auth);

module.exports = router;
