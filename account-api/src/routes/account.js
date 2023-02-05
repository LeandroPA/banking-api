const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { param, oneOf } = require('express-validator');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/', accountController.create);
router.get('/:id', validate(oneOf([
    param('id').isMongoId(),
    param('id').matches(/^\d{1,4}-\d{1,7}-\d$/)
], 'id must be a valid id or agency and number format')), accountController.get);
router.post('/:id/block', validate(param('id').isMongoId()), accountController.block);
router.delete('/:id/block', validate(param('id').isMongoId()), accountController.unblock);
router.post('/:id/disable', validate(param('id').isMongoId()), accountController.disable);

module.exports = router;
