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
        util.userNotLogin(ctx);
        return ;
    }
    let fields = ctx.request.fields || {};
    const pageSize = fields.pageSize || 10;
    const startIndex = fields.startIndex || 0;
    try {
        const notes = await noteService.getLatestByUid(ctx.session.uid, startIndex, pageSize);
        const noteArr = notes.map(note => {
            return note.toJson();
        });
        ctx.body = {
            code: Code.OK,
            data:noteArr 
        };
    } catch (err) {
        logger.error('get latest note', err);
        ctx.body = {
            code: err.code || Code.ERROR
        };
    }
});

router.addRoute('PUT /notes/new', async (ctx, next) => {
    if (!ctx.session.uid) {
        util.userNotLogin(ctx);
        return ;
    }
    const title = ctx.request.fields.title;
    const content = ctx.request.fields.content;
    try {
        const note = await noteService.createNote(ctx.session.uid, title, content);
        const noteJson = note.toJson();
        ctx.body = {
            code: Code.OK,
            data: noteJson
        };
    } catch (err) {
        logger.error('create note', err);
        ctx.body = {
            code: err.code || Code.ERROR
        };
    }
});

module.exports = router;