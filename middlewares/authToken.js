

module.exports = async (req, res, next) => {
    const { db_user } = require('../libs/mongodb');
    const logger = require('winston');

    const { authorization } = req.headers
    try {
        logger.debug(authorization)
        if (!authorization) return res.sendStatus(404);
        const [method, token] = authorization.split(" ")
        const user = await db_user.findOne({
            "credential.method": method,
            "credential.token": token,
            "is_delete": { $ne: true },
        })
        if (!user) return res.sendStatus(401)
        req.user = user
        next()
    } catch (err) {
        logger.error(err.message)
        res.status(500).send(err.message)
    }
}