'use strict';
const router = require('koa-better-router')();
const v1 = require('./v1/api');

router.addRoute('GET /api/', (ctx, next) => {
    ctx.body = {
        code: 0,
        data: ['v1']
    };
});

router.addRoutes(v1.getRoutes());

module.exports = router;