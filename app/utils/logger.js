'use strict';
const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console'},
        file: {type: 'file', filename: 'logs/normal.log', maxLogSize: 10 * 1024 * 1024}
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info'}
    }
});

module.exports = function(path) {
    const logger = log4js.getLogger('normal');
    logger.level = 'debug';
    return logger;
};