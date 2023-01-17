const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.create);
router.post('/:id/block', accountController.create);
router.post('/:id/disable', accountController.create);
router.post('/:id/disable', accountController.create);
router.get('/:id', accountController.get);
router.delete('/:id', accountController.delete);

module.exports = router;
