'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const serve = require('koa-better-serve');
const koaLog = require('koa-logger');
const Koa = require('koa');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/server.json');
const Code = require('./shared/code');

const logger = require('./app/utils/logger')('index.js');
const body = require('koa-better-body');
const session = require('koa-session');
const api = require('./app/api/api');
const app = new Koa();

const wwwroot = './wwwroot/build';

app.keys = ['saye like'];
const sessionConfig = {
    key: 'yn:saye'
};

app.use(session(sessionConfig, app))
    .use(koaLog())
    .use(body());

// error handle, so can just throw error in router
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        let code = Code.ERROR;
        let message = 'internal error';
        if (err.code) {
            code = err.code;
            message = err.message;
        } else {
            logger.error('internal error', `path ${ctx.path}`);
            logger.error('internal error', err);
        }
        ctx.body = {
            code: code,
            message: message
        };
    }
});

app.use(async (ctx, next) => {
    const lead = ctx.path.split('/')[1];
    const apiRoute = api.middleware();
    const pubRoute = serve(wwwroot, '');
    if (lead === 'api') {
        return apiRoute.call(this, ctx, next);
    } else {
        return pubRoute.call(this, ctx, next);
    }
});

/*
app.use(api.middleware());
app.use(serve('./public', ''));
*/


app.listen(config.port, () => {
    logger.info(`listening on ${config.port}`);
});

mongoose.connect(config.mongoUrl, {
    useMongoClient: true
});