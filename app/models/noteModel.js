'use strict';
const mongoose = require('mongoose');
const Counter = require('./counterModel');
const util = require('../utils/util');
const Code = require('../../shared/code');

const noteSchema = mongoose.Schema({
    uid: Number,
    title: String,
    content: String,
    type: Number,
    createDate: Date,
    updateDate: Date  
});

noteSchema.index({uid: 1});

noteSchema.statics.createNote = function(userId, title, content, type) {
    const now = new Date();
    const noteJson = {
        uid: userId,
        title: title,
        content: content,
        createDate: now,
        updateDate: now
    };
    const note = new Note(noteJson);
    return note.save().then(() => {
        return note;
    });
};

noteSchema.statics.getLatestByUser = function(userId, startIndex, pageSize) {
    return this.find({uid: userId}).sort({updateDate: -1}).skip(startIndex).limit(pageSize).exec();
};

noteSchema.methods.toJson = function() {
    return {
        uid: this.uid,
        title: this.title,
        content: this.content,
        type: this.type,
        createDate: this.createDate.getTime(),
        updateDate: this.updateDate.getTime()
    };
};

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;