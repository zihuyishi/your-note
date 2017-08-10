'use strict';
const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    name: String,
    count: Number
});

counterSchema.index({name: 1}, {unique: true});

counterSchema.statics.nextSequence = function(name) {
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({name: name}, {
            $inc: { count: 1 }
        }, {
            new: true,
            upsert: true
        }, (err, counter) => {
            if (err) {
                reject(err);
            } else {
                resolve(counter.count);
            }
        });
    });
};


const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;