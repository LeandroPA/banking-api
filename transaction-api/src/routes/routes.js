const express = require('express');
const router = express.Router();

const indexRoute = require('./index');
const transactionRoute = require('./transaction');

router.use('/', indexRoute);
router.use('/transaction', transactionRoute
    /* 
		#swagger.parameters['Accept-Language'] = { $ref: '#/components/parameters/Accept_Language'}
		#swagger.parameters['lang'] = { $ref: '#/components/parameters/Lang'}
    */
);

module.exports = router;
