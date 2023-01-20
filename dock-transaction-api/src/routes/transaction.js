const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.create);
router.get('/:id', transactionController.get);
router.delete('/:id', transactionController.delete);

module.exports = router;
