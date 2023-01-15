const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.post('/', personController.create);
router.delete('/:id', personController.delete);

module.exports = router;
