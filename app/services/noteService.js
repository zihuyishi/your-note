'use strict';
const Note = require('../models/noteModel');

class NoteService {
    async getById(id) {
        return Note.findById(id).exec();
    }
    async getLatestByUid(uid, startIndex, pageSize) {
        return Note.getLatestByUser(uid, startIndex, pageSize);
    }
    async createNote(uid, title, content, options) {
        options = options || {};
        const type = options.type || 0;
        return Note.createNote(uid, title, content, type);
    }
    async deleteNote(_id) {
        return Note.remove({_id: _id});
    }
}

const singleton = new NoteService();

module.exports = singleton;