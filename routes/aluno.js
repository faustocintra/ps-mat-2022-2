const express = require('express');
const router = express.Router();
const controller =  require('../controllers/aluno');

router.post('/', controller.create);
router.get('/', controller.retrieve);
// :id é uma parte váriavel da URI que será interpretada
// como um parâmetro chamado id
router.get('/:id', controller.retrieveOne);
router.put('/', controller.update);

module.exports = router