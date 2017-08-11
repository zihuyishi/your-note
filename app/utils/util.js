'use strict';
const Code = require('../../shared/code');
const Util = module.exports;

Util.createError = function(msg, code) {
    code = code || Code.ERROR;
    const err = new Error(msg);
    err.code = code;

    const stack = err.stack.split('\n');
    stack.splice(1, 1);
    err.stack = stack;
    return err;
};

Util.userNotLoginError = function() {
    return this.createError('user not login', Code.USER_NOT_LOGIN);
};