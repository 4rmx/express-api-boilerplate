"use strict";
const winston = require('winston');
const { format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, printf, timestamp, } = format;
const path = require('path');

const levelPrintf = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
const normalPrintf = printf(({ message, timestamp }) => {
    return `${timestamp} ${message}`;
});

const consoleTransport = new transports.Console({
    level: 'debug',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.colorize(),
        levelPrintf
    )
})

const fileCombine = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    normalPrintf
)

const fileTransport = new DailyRotateFile({
    level: 'info',
    filename: path.join(__dirname, '../logs', 'server', `%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d',
    format: fileCombine
})
const fileMorganTransport = new DailyRotateFile({
    level: 'info',
    filename: path.join(__dirname, '../logs', 'morgan', `%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d',
    // format: fileCombine
})

const PROD_MODE = process.env.NODE_ENV === 'production'

if (PROD_MODE) {
    winston.add(fileTransport)
    winston.loggers.add('morgan', {
        format: fileCombine,
        transports: [fileMorganTransport]
    })
} else {
    winston.add(consoleTransport)
    winston.loggers.add('morgan', {
        transports: [consoleTransport]
    })
}