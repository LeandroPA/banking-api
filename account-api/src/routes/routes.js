const express = require('express');
const router = express.Router();

const indexRoute = require('./index');
const accountRoute = require('./account');

router.use('/', indexRoute);
router.use('/account', accountRoute);

module.exports = router;
