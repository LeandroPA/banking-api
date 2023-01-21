const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.get('/:id', transactionController.get);
router.get('/account/:id/balance', transactionController.getBalance);
router.get('/account/:id/statement', transactionController.getStatement);
router.delete('/:id', transactionController.delete);

module.exports = router;
