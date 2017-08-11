'use strict';
const Code = require('../../shared/code');
const User = require('../models/userModel');
const util = require('../utils/util');
const Consts = require('../../shared/consts');
const _ = require('lodash');

class UserService {
    async getById(uid) {
        return User.findOne({id: uid}).exec();
    }

    async getByEmail(email) {
        return User.findOne({email: email}).exec();
    }

    async createUser(email, name, password, role) {
        role = role || Consts.USER_ROLE.Normal;
        return User.createUser(email, name, password, role);
    }

    async login(email, password) {
        const user = await this.getByEmail(email);
        if (!user) {
            throw util.createError('user not found', Code.USER_NOT_EXISTS);
        }
        if (password != user.password) {
            throw util.createError('wrong password', Code.WRONG_PASSWORD);
        }
        return Promise.resolve(user);
    }

    async updateUser(uid, options) {
        const keys = ['password', 'name'];
        const ops = {};
        for (let key of keys) {
            if (options[key] != null) {
                ops[key] = options[key];
            }
        }
        return User.findOneAndUpdate({id: uid}, {$set: ops});
    }
}

const singleton = new UserService();

module.exports = singleton;