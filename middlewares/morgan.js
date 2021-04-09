const morgan = require('morgan');
const winston = require('winston');
const logger = winston.loggers.get('morgan');

const format = (tokens, req, res) => [
    tokens['remote-addr'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    `status: ${tokens.status(req, res)},`,
    tokens['response-time'](req, res), 'ms'
].join(' ')

const options = {
    // skip: (req) => req.originalUrl === '/endpoint',
    stream: {
        write: (message) => { logger.info(message.replace("\n", "")); }
    }
}

module.exports = morgan(format, options)