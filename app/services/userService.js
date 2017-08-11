'use strict';
const Code = require('../../shared/code');
const User = require('../models/userModel');
const util = require('../utils/util');

class UserService {
    async getById(uid) {
        return User.findOne({id: uid}).exec();
    }

    async getByEmail(email) {
        return User.findOne({email: email}).exec();
    }

    async createUser(email, name, password) {
        return User.createUser(email, name, password);
    }

    async login(email, password) {
        return this.getByEmail(email).then(user => {
            if (!user) {
                throw util.createError('user not found', Code.USER_NOT_EXISTS);
            } 
            if (password != user.password) {
                throw util.createError('wrong password', Code.WRONG_PASSWORD);
            }
            return user;
        });
    }

    async updateUser(uid, options) {
        return User.findOneAndUpdate({uid: uid}, {$set: options});
    }
}

const singleton = new UserService();

module.exports = singleton;