router.post('/', controller.create)
router.get('/', controller.retrieve)
// :id é uma parte variável da URI que será interpretada
// como um parâmetro chamado id
router.get('/:id', controller.retrieveOne)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router