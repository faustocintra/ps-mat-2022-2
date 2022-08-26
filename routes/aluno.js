const express = require('express')
const { update } = require('../controllers/aluno')
const router = express.Router()
const controller = require('../controllers/aluno')


router.post('/', controller.create)
router.get('/', controller.retrieve)
// id é uma parte variavel da URI que será interpretada
// como um parametro chamado id
router.get('/:id', controller.retrieveOne)
router.put('/', controller.update)

module.exports = router