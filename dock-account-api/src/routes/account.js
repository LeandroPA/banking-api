const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.post('/', personController.create);
router.get('/:id', personController.get);
router.get('/documentNumber/:documentNumber', personController.getByDocumentNumber);
router.delete('/:id', personController.delete);

module.exports = router;
