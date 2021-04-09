// "use strict";
require('./libs/winstonLogger');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('./middlewares/bodyParser');
const morgan = require('./middlewares/morgan');
const logger = require('winston');

app.use(cors());
app.use(bodyParser.jsonParser);
app.use(bodyParser.urlencodedParser);
app.use(morgan)

const PROD_MODE = process.env.NODE_ENV === 'production', DEV_PORT = 8080
const routes = require('./routes');

if (PROD_MODE) {
    const fs = require('fs');
    const credentials = {
        key: fs.readFileSync('/etc/letsencrypt/live/website.com/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/website.com/fullchain.pem', 'utf8'),
    };
    const POOL = 50
    require('./libs/mongodb')(POOL)
        .then(() => logger.info(`mongodb is connected (${POOL})`))
        .catch(err => logger.error(err.message))

    app.use('/', express.static(require('path').join(__dirname, 'public/')))
    app.get('/test', (req, res) => res.send('Hello World'))
    app.use('/v1', routes)

    require('http').createServer(app).listen(80, () => {
        logger.info(`HTTP server running`)
    });
    require('https').createServer(credentials, app).listen(443, () => {
        logger.info(`HTTPS server running`)
    });

} else {
    const POOL = 2
    require('./libs/mongodb')(POOL)
        .then(() => logger.info(`mongodb is connected (${POOL})`))
        .catch(err => logger.error(err.message))

    app.get('/test', (req, res) => res.send('Hello World'))
    app.use('/v1', routes)

    app.listen(DEV_PORT, () => {
        logger.info(`development server running on ${DEV_PORT}`)
    })
}




