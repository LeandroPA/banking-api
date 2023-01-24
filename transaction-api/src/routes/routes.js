const express = require('express');
const router = express.Router();

const indexRoute = require('./index');
const transactionRoute = require('./transaction');

router.use('/', indexRoute);
router.use('/transaction', transactionRoute);

module.exports = router;
