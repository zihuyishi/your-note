'use strict';
const koaLog = require('koa-logger');
const Koa = require('koa');
const config = require('./config/server.json');
const logger = require('./app/utils/logger')('index.js');
const body = require('koa-better-body');
const session = require('koa-session');
const api = require('./app/api/api');
const app = new Koa();

const sessionConfig = {
    key: 'koa:saye'
};

app.use(session(sessionConfig, app))
    .use(koaLog())
    .use(body());

app.use(api.middleware());

app.listen(config.port, () => {
    logger.info(`listening on ${config.port}`);
});

