'use strict';
const Code = require('../../shared/code');
const User = require('../models/userModel');

class UserService {
    async getById(uid) {

    }

    async createUser(email, name, password) {
        return User.createUser(email, name, password);
    }

    async emailExists(email) {
        return new Promise((resolve, reject) => {

        });
    }

    async login(email, password) {
        return new Promise((resolve, reject) => {
            resolve({code: Code.OK, uid: 1});
        });
    }
}

const singleton = new UserService();

module.exports = singleton;