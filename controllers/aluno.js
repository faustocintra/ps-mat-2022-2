const Aluno = require('../models/aluno')

const controller = {}       // Objeto vazio

/*
    Métodos do controller:
    create: cria um novo registro
    retrieve: lista todos os registros
    retriveOne: lista apenas um registro
    update: atualiza o registro
    delete: exclui o registro
*/

controller.create = async(req, res) => {
    try {
        await Aluno.create(req.body)
        res.status(201).end()
    } 
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try {
        const result = await Aluno.findAll()
        // HTTP 200: OK (implícito)
        res.send(result)
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await Aluno.findByPk(req.params.id)

        // result ? res.send(200) : res.status(404).end 
        if(result) {
            res.send(200)
        }
        else{
            res.status(404).end()
        }
    } 
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {

    try {
        const response = await Aluno.update(
            req.body,
            {where: {id: req.body.id}}
        )
        
        // response ? res.send(204).end() : res.status(404).end
        if(response[0] > 0) { // encontrou e atualizou
            res.status(204).end() // No content
        }
        else {
            res.status(404).end()
        }

    } 
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}


module.exports = controller




// const Aluno = require('../models/aluno')

// const controller = {}       //objeto vazio



// /*
//     Métodos do controller:
//     create: cria um novo registro
//     retrieve: lista todos os registros
//     retrieveOne: lista apenas um registro
//     update: atualiza o registro
//     delete: deleta o registro
// */

// controller.retrieve = async (req, res) => {
//     try {
//         const result = await Aluno.findAll()
//         // HTTP 200: OK
//         res.send(result)
//     } catch (error) {
//         console.error(error)
//         //HTTP 500: Internal Server Error
//         res.status(500).send(error)
//     }
// }

// module.exports = controller