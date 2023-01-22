const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { param } = require('express-validator');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/', accountController.create);
router.get('/:id', validate(param('id').isMongoId()), accountController.get);
router.post('/:id/block', validate(param('id').isMongoId()), accountController.block);
router.delete('/:id/block', validate(param('id').isMongoId()), accountController.unblock);
router.post('/:id/disable', validate(param('id').isMongoId()), accountController.disable);
router.delete('/:id', validate(param('id').isMongoId()), accountController.delete);

module.exports = router;
