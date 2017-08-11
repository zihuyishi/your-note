'use strict';
const Code = require('../../../shared/code');
const userService = require('../../services/userService');
const Router = require('koa-better-router');
const router = Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('users');
const util = require('../../utils/util');


router.addRoute('POST /user/login', async (ctx, next) => {
    if (ctx.session.uid) {
        ctx.body = {
            code: Code.USER_ALREAD_LOGIN,
            message: 'user already login'
        };
        return ;
    }
    const email = ctx.request.fields.email;
    const pass = ctx.request.fields.password;
    try {
        const user = await userService.login(email, pass);
        const userJson = user.toJson();
        delete userJson.password;
        ctx.session.uid = user.id;
        ctx.body = {
            code: Code.OK,
            data: userJson
        };
    } catch (err) {
        ctx.body = {
            code: err.code || Code.ERROR
        };
    }
});

router.addRoute('GET /user/logout', (ctx, next) => {
    if (!ctx.session.uid) {
        ctx.body = {
            code: Code.ERROR,
            message: 'not login'
        };
    } else {
        ctx.session = null;
        ctx.body = {
            code: Code.OK
        };
    }
});

router.addRoute('POST /user/signup', async (ctx, next) => {
    if (ctx.session.uid) {
        ctx.body = {
            code: Code.USER_ALREAD_LOGIN,
            message: 'user already login'
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

router.addRoute('GET /user/current', async (ctx, next) => {
    if (!ctx.session.uid) {
        util.userNotLogin(ctx);
        return ;
    }

    try {
        const user = await userService.getById(ctx.session.uid);
        if (user == undefined) {
            ctx.body = {
                code: Code.USER_NOT_EXISTS
            };
        } else {
            const jsonUser = user.toJson();
            delete jsonUser.password;
            ctx.body = {
                code: Code.OK,
                data: jsonUser
            };
        }
    } catch (err) {
        logger.error('get current user', err);
        ctx.body = {
            code: err.code || Code.ERROR,
            message: err.message
        };
    }
});

router.addRoute('POST /user/update', async (ctx, next) => {
    if (!ctx.session.uid) {
        util.userNotLogin(ctx);
        return ;
    }

    const userId = ctx.session.uid;
    const password = ctx.request.fields.password;
    const name = ctx.request.fields.name;
    if (password == undefined && name == undefined) {
        ctx.body = {
            code: Code.WRONG_PARAMETERS,
            message: 'no parameters'
        };
        return ;
    }

    try {
        await userService.updateUser(userId, {password, name});
        ctx.body = {
            code: Code.OK
        };
    } catch (err) {
        logger.error('update user', err);
        ctx.body = {
            code: err.code || Code.ERROR,
            message: err.message
        };
    }
});

module.exports = router;