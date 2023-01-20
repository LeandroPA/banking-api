const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.create);
router.get('/:id', accountController.get);
router.post('/:id/block', accountController.block);
router.delete('/:id/block', accountController.unblock);
router.post('/:id/disable', accountController.disable);
router.delete('/:id', accountController.delete);

module.exports = router;
