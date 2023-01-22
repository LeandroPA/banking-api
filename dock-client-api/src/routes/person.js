const express = require('express');
const { param } = require('express-validator');
const router = express.Router();
const personController = require('../controllers/personController');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/', personController.create);
router.get('/:id', validate(param('id').isMongoId()), personController.get);
router.get('/documentNumber/:documentNumber', personController.getByDocumentNumber);

module.exports = router;
