const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/login', controller.login)

module.exports = router