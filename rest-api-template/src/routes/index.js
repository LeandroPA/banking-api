var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	// #swagger.ignore  = true
	res.send({ apiVersion: process.env.npm_package_version });
});

module.exports = router;
