const Aluno = require('../models/aluno')
const controller = {} //objeto vazio

/*
    Métodos do controller: 
    create: cria um novo registro
    retrieve: lista todos os registros
    retriveOne: lista apenas um registro
    update: atualiza o registro
    delete: exclui o registro
*/

controller.retrieve = async(req, res) => {
    try{
        const result = await Aluno.findAll()
        //HTTP 200: OK(implícito)
        res.send(result)
    } catch (error){
        console.log(error)
        //HTTP 500: internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller