const express = require('express')
const router = express.Router()
const controller = require('../controllers/aluno')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.retrieveUpdate)

module.exports = router