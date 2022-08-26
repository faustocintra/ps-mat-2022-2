const express = require('express')
const router = express.Router()
const controller = require('../controllers/aluno')

router.post('/', controller.create)
router.get('/', controller.retrieve)
// :id é uma parte variável da URI 
router.get('/:id', controller.retrieveOne)
router.put('/', controller.update)

module.exports = router