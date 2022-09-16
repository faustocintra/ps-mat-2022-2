const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario')
const verif_token = require('../lib/verif_token')

router.post('/', verif_token, controller.create)
router.get('/', verif_token, controller.retrieve)
router.get('/:id', verif_token, controller.retrieveOne)
router.patch('/:id', verif_token, controller.retrieveUpdate)
router.delete('/:id', verif_token, controller.delete)
router.post('/login', controller.login)

module.exports = router