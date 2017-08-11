'use strict';
const Router = require('koa-better-router');

const router = Router({prefix: '/api/v1'});

router.extend(require('./userRouter'));
router.extend(require('./notes'));

module.exports = router;