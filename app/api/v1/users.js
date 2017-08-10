'use strict';
const Code = require('../../../shared/code');
const userService = require('../../services/userService');
const Router = require('koa-better-router');
const router = Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('users');

/**
 * get user by user id
 * /api/v1/users/:id
 */
router.addRoute('GET /users/:uid', (ctx, next) => {
    const userId = ctx.params.uid;
    ctx.body = `your want user ${userId}`;
});

router.addRoute('POST /users/login', async (ctx, next) => {
    const email = ctx.request.fields.email;
    const pass = ctx.request.fields.password;
    let ret = await userService.login(email, pass);
    if (ret.code !== Code.OK) {
        ctx.body = {
            code: ret
        };
    } else {
        ctx.session.uid = ret.uid;
        ctx.body = {
            code: Code.OK
        };
    }
});

router.addRoute('POST /users/logout', (ctx, next) => {
    if (!ctx.session.uid) {
        ctx.body = {
            code: Code.ERROR,
            message: 'not login'
        };
    } else {
        delete ctx.session.uid;
    }
});

router.addRoute('POST /users/signup', async (ctx, next) => {
    if (ctx.session.uid) {
        ctx.body = {
            code: Code.USER_ALREAD_LOGIN,
            message: 'user alread login'
        };
    } else {
        const email = ctx.request.fields.email;
        const name = ctx.request.fields.name;
        const pass = ctx.request.fields.password;
        if (!_.isString(email) && !_.isString(name) && !_.isString(pass)) {
            ctx.body = {
                code: Code.WRONG_PARAMETERS,
                message: 'wrong parameters'
            };
            return ;
        }
        try {
            const newUser = await userService.createUser(email, name, pass);
            const userJson = newUser.toJson();
            ctx.session.uid = userJson.id;
            ctx.body = {
                code: Code.OK,
                data: userJson
            };
        } catch (err) {
            logger.error('signup', err);
            ctx.body = {
                code: err.code || Code.ERROR,
                message: err.message
            };
        }
    }
});


module.exports = router;