'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const controllers = require('../../../controllers');

router.get('/', controllers.roles.list);
router.post('/', passport.authenticate('jwt', { session: false }), controllers.roles.create);
router.put('/:role', passport.authenticate('jwt', { session: false }), controllers.roles.update);
router.put('/:role/increment', passport.authenticate('jwt', { session: false }), controllers.roles.increment);
router.put('/:role/decrement', passport.authenticate('jwt', { session: false }), controllers.roles.decrement);
router.delete('/role', passport.authenticate('jwt', { session: false }), controllers.roles.destroy);

module.exports = router;
