const router = require('express').Router();

router.post('/', (req, res) => {
    const logger = require('winston');
    logger.debug('%o', req.body)
    const { username, password } = req.body
    try {
        if (!username || !password) return res.sendStatus(400);
        res.sendStatus(200);
    } catch (err) {
        logger.error(err.message)
    }
});

module.exports = router