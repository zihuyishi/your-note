'use strict';
const Code = require('../../../shared/code');
const userService = require('../../services/userService');
const Router = require('koa-better-router');
const router = Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('users');
const util = require('../../utils/util');

router.addRoute('GET /notes/latest', async (ctx, next) => {
    if (!ctx.session.uid) {
        util.userNotLogin(ctx);
        return ;
    }
    
});