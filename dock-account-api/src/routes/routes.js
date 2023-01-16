const express = require('express');
const router = express.Router();

const indexRoute = require('./index');
const personRoute = require('./account');

router.use('/', indexRoute);
router.use('/person', personRoute);

module.exports = router;
