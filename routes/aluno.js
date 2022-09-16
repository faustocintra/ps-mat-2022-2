const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno');
const verifToken = require("../lib/verif_token");

router.post('/', verifToken, controller.create);
router.get('/', verifToken, controller.retrieve);
router.get('/:id', verifToken, controller.retrieveOne);
// router.put('/', controller.update)
router.patch('/:id', verifToken, controller.update) // Pegar o ID na rota
router.delete('/:id', verifToken, controller.delete) // Pegar o ID na rota

module.exports = router;