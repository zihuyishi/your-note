'use strict';
const mongoose = require('mongoose');
const Counter = require('./counterModel');
const util = require('../utils/util');
const Code = require('../../shared/code');
const Consts = require('../../shared/consts');

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    role: Number
});

userSchema.index({id: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});

userSchema.statics.createUser = async function(email, name, password, role) {
    const user = await this.findOne({email: email}).exec();
    if (user) {
        throw util.createError('email exists', Code.EMAIL_EXISTS);
    }
    const newUid = await Counter.nextSequence('user');
    const userJson = {id: newUid, name: name, email: email, password: password, role: role};
    const newUser = new User(userJson);
    await newUser.save();
    return Promise.resolve(newUser);
};

userSchema.methods.toJson = function() {
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role || Consts.USER_ROLE.Normal
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;