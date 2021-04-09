const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/signin', require('./signin'));

module.exports = router