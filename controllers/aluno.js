const Aluno = require('../models/aluno');

const controller = {}; 

controller.create = async(req, res) => {
    try{
        await Aluno.create(req.body)
        // HTTP 200 = OK (Implicito)
        res.status(201).end();
    }
    catch(error){
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }
}

controller.retrieve = async(req, res) => {
    try{
        const result = await Aluno.findAll();
        // HTTP 200 = OK (Implicito)
        res.send(result);
    }
    catch(error){
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }
}

controller.retrieveOne = async(req, res) => {
    try{
        const result = await Aluno.findByPk(req.params.id);

        if(result) {
            // HTTP 200: OK (implícito)
            res.send(result)
        }
        else {
            // HTTP 404: Not found  
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }
}

controller.update = async(req, res) => {
    try{
        const response = await Aluno.update(
            req.body,
            // {where: {id: req.body.id}}
            {where: {id: req.params.id}}
            );
        // console.log("======>", {response})

        if(response[0] > 0) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }
}

controller.delete = async(req, res) => {
    try{
        const response = await Aluno.destroy(
            {where: {id: req.params.id}}
            );
        console.log("======>", {response})

        if(response) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }
}

module.exports = controller;

// const Aluno = require('../models/aluno')

// const controller = {}       // Objeto vazio

// /*
//     Métodos do controller:
//     create: cria um novo registro
//     retrieve: lista todos os registros
//     retriveOne: lista apenas um registro
//     update: atualiza o registro
//     delete: exclui o registro
// */

// controller.retrieve = async (req, res) => {
//     try {
//         const result = await Aluno.findAll()
//         // HTTP 200: OK (implícito)
//         res.send(result)
//     }
//     catch(error) {
//         console.error(error)
//         // HTTP 500: Internal Server Error
//         res.status(500).send(error)
//     }
// }

// module.exports = controller