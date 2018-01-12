'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../../../controllers');

router.post('/', controllers.auth.login);
router.post('/login', controllers.auth.login);

module.exports = router;
