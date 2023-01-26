const express = require('express');
const router = express.Router();

const indexRoute = require('./index');
const accountRoute = require('./account');
const documentationRoute = require('./documentation');

router.use('/', indexRoute);
router.use('/account', accountRoute);
router.use('/doc', documentationRoute);

module.exports = router;
