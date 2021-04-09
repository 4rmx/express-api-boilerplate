const router = require('express').Router();
const controller = require('../controllers/user');

router.route('/')
    .get(controller.getUser)
    .post(controller.postUser)

module.exports = router