const Aluno = require('../models/aluno')

const controller = {} // objeto vazio

/*
    Métodos do controller:
    create: criar um novo registro
    retrieve: lista todos os registos
    retriveOne: lista apenas um registro
    update: atualiza o registro
    delete: exclui o registro
 */

controller.retrieve = async (req, res) =>{
    try {
        const result = await Aluno.findAll()
        // HTPP 200: OK (implícito)
        res.send(result)
    }
    catch(error) {
        console.log(error)
        // HTTP 500: Interno Server Error 
        res.status(500).send(error)
    }
}

module.exports = controller