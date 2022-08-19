const Aluno = require('../models/aluno')

const controller = {}       //objeto vazio



/*
    Métodos do controller:
    create: cria um novo registro
    retrieve: lista todos os registros
    retrieveOne: lista apenas um registro
    update: atualiza o registro
    delete: deleta o registro
*/

controller.retrieve = async (req, res) => {
    try {
        const result = await Aluno.findAll()
        // HTTP 200: OK
        res.send(result)
    } catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller