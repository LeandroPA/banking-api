const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { param, query } = require('express-validator');
const validate = require('../errorHandler/requestValidationErrorHandler');

router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.post('/transfer', transactionController.transfer);
router.get('/:id', validate(param('id').isMongoId()), transactionController.get);
router.get('/:id/coupon', validate(param('id').isMongoId()), transactionController.getCoupon);
router.get('/account/:id/balance', validate(param('id').isMongoId()), transactionController.getBalance);
router.get('/account/:id/statement', validate(
    param('id').isMongoId(), 
    query('from')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
        .isBefore()
        .withMessage('Date must be before or equal to today')
        .toDate(), 
    query('to')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
        .isBefore()
        .withMessage('Date must be before or equal to today')
        .toDate()
        .custom((to, { req }) => {
        if (req.query.from && to.getTime() < req.query.from.getTime()) {
            throw new Error('Date must be equal or after \'from\' date');
        }
        return true
    })), transactionController.getStatement);

module.exports = router;
