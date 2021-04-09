const router = require('express').Router();

exports.getUser = router.use(async (req, res) => {
    const logger = require('winston');
    logger.debug('%O', req.query)
    try {
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
        logger.error(err.message);
    }
});

exports.postUser = router.use(async (req, res) => {
    const logger = require('winston');
    logger.debug('%O', req.body)
    try {
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
        logger.error(err.message);
    }
});