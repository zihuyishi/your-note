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
    const user = await userService.login(email, pass);
    const userJson = user.toJson();
    delete userJson.password;
    ctx.session.uid = user.id;
    ctx.body = {
        code: Code.OK,
        data: userJson
    };
});

router.addRoute('GET /user/logout', (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.createError('not login', Code.USER_NOT_LOGIN);
    } 
    ctx.session = null;
    ctx.body = {
        code: Code.OK
    };
});

router.addRoute('POST /user/signup', async (ctx, next) => {
    if (ctx.session.uid) {
        throw util.createError('user already login', Code.USER_ALREAD_LOGIN);
    } 
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
    const newUser = await userService.createUser(email, name, pass);
    const userJson = newUser.toJson();
    ctx.session.uid = userJson.id;
    ctx.body = {
        code: Code.OK,
        data: userJson
    };
});

router.addRoute('GET /user/whoami', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError(ctx);
    }

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
});

router.addRoute('POST /user/update', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError();
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

    await userService.updateUser(userId, {password, name});
    ctx.body = {
        code: Code.OK
    };
});

module.exports = router;