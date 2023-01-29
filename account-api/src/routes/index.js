var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	/*
		#swagger.operationId = 'index'
		#swagger.tags = ['Index']
		#swagger.summary = 'Index endpoint'
		#swagger.description = 'Some description...'
		#swagger.produces = ['application/json']
		#swagger.responses[200] = {
			description: 'A valid response as health check, including some api informations',			
			content: {
				"application/json": {
					schema: { 
						type: 'object',
						properties: {
							apiVersion: {
								type: 'string',
								example: '1.0.0',
							}
						}
					},
				}
			}
		}
	*/
	res.json({ apiVersion: process.env.npm_package_version });
});

module.exports = router;
