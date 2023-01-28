const express = require('express');
const { param, oneOf } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator');
const router = express.Router();
const personController = require('../controllers/personController');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/', personController.create);
router.get('/:id', validate(oneOf([
    param('id').isMongoId(),
    param('id').custom(cpf.isValid)
], 'id must be a valid id or document number')), personController.get);
router.get('/documentNumber/:documentNumber', personController.getByDocumentNumber);

module.exports = router;
