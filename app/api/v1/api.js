'use strict';
const Router = require('koa-better-router');

const router = Router({prefix: '/api/v1'});

router.extend(require('./users'));

module.exports = router;