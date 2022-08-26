const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno');

router.get('/', controller.retrieve);

module.exports = router;