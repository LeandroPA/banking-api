const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { param } = require('express-validator');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.get('/:id', validate(param('id').isMongoId()), transactionController.get);
router.get('/account/:id/balance', validate(param('id').isMongoId()), transactionController.getBalance);
router.get('/account/:id/statement', validate(param('id').isMongoId()), transactionController.getStatement);
router.delete('/:id', validate(param('id').isMongoId()), transactionController.delete);

module.exports = router;
