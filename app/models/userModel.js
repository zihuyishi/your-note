'use strict';
const mongoose = require('mongoose');
const Counter = require('./counterModel');
const util = require('../utils/util');
const Code = require('../../shared/code');

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String
});

userSchema.index({id: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});

userSchema.statics.createUser = function(email, name, password) {
    return this.find({email: email}).exec().then(users => {
        if (users && users.length !== 0) {
            throw util.createError('email exists', Code.EMAIL_EXISTS);
        }
    }).then(() => {
        return Counter.nextSequence('user');
    }).then(newUid => {
        const userJson = {id: newUid, name: name, email: email, password: password};
        const newUser = new User(userJson);
        return newUser.save().then(() => {
            return newUser;
        });
    });
};

userSchema.methods.toJson = function() {
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;