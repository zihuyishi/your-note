'use strict';
const Code = require('../../../shared/code');
const noteService = require('../../services/noteService');
const Router = require('koa-better-router');
const router = Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('users');
const util = require('../../utils/util');

router.addRoute('GET /notes/latest', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError();
    }
    let fields = ctx.request.fields || {};
    const pageSize = fields.pageSize || 10;
    const startIndex = fields.startIndex || 0;
    const notes = await noteService.getLatestByUid(ctx.session.uid, startIndex, pageSize);
    const noteArr = notes.map(note => {
        return note.toJson();
    });
    ctx.body = {
        code: Code.OK,
        data:noteArr 
    };
});

router.addRoute('PUT /notes/new', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError();
    }
    const title = ctx.request.fields.title;
    const content = ctx.request.fields.content;
    const note = await noteService.createNote(ctx.session.uid, title, content);
    const noteJson = note.toJson();
    ctx.body = {
        code: Code.OK,
        data: noteJson
    };
});

router.addRoute('DELETE /notes/:id', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError(ctx);
    }
    const _id = ctx.params.id;
    const note = await noteService.getById(_id);
    if (note.uid != ctx.session.uid) {
        ctx.body = {
            code: Code.PERMISSION_DENIED,
            message: 'permission denied'
        };
    }
    await noteService.deleteNote(_id);
    ctx.body = {
        code: Code.OK
    };
});

router.addRoute('POST /notes/update/:id', async (ctx, next) => {
    if (!ctx.session.uid) {
        throw util.userNotLoginError();
    }
    const _id = ctx.params.id;
    const title = ctx.request.fields.title;
    const content = ctx.request.fields.content;
});

module.exports = router;