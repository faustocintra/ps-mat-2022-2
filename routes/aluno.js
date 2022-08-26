const express = require('express')
const router = express.Router()
const controller = require('../controllers/aluno')

router.post('/', controller.create)
router.get('/', controller.retrieve)
// :id é uma parte variavel de URI que será interpretada como um parâmetro cahamdo ID
router.get('/:id', controller.retrieveOne)
router.put('/', controller.update)

module.exports = router