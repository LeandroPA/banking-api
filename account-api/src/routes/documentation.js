const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.get('/swagger.json', (req, res) => res.json(swaggerFile));

module.exports = router;