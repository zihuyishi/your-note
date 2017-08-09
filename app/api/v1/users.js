'use strict';
const userService = require('../../services/userService');
const Router = require('koa-better-router');
const router = Router();

router.addRoute('GET /users/:uid', (ctx, next) => {
    const userId = ctx.params.uid;
    ctx.body = `your want user ${userId}`;
});


module.exports = router;