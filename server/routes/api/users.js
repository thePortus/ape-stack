'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const controllers = require('../../controllers');

router.get('/', passport.authenticate('jwt', { session: false }), controllers.users.list);
router.post('/', controllers.users.create);
router.get('/:user_id', passport.authenticate('jwt', { session: false }), controllers.users.read);
router.put('/:user_id', passport.authenticate('jwt', { session: false }), controllers.users.update);
router.delete('/user_id', passport.authenticate('jwt', { session: false }), controllers.users.destroy);

module.exports = router;
