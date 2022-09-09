const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario')

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
        await Usuario.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }

}

controller.retrieve = async (req, res) => {
    try {
        const result = await Usuario.findAll()
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
        const result = await Usuario.findByPk(req.params.id)

        if(result){
        // HTTP 200: OK (implícito)
        res.send(result)
        }
        else {
            //HTTP 404: Not Fund
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const response = await Usuario.update(
            req.body,
            {where: {id: req.params.id }} 
        )
        
        if(response){ //Encontrou e atualizou
            // HTTP204: No content
            res.status(204).end()
        }
        else { //Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const response = await Usuario.destroy(
            {where: {id: req.params.id }} 
        )
        
        if(response){ //Encontrou e atualizou
            // HTTP204: No content
            res.status(204).end()
        }
        else { //Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: {email: req.body.email }})

        if(!usuario){ // Usuario não existe
        // HTTP: 401: Unauthorized
        res.status(401).end()
    }
    else {
        let senhaOK = await bcrypt.compare(req.body.senha, usuario.hash_senha)

        if(senhaOK){
            //Gera e retorna o token
            const token = jwt.sign(
                {id: usuario.id}, 
                process.env.TOKEN_SECRET,
                {expiresIn: '8h' }
             )
             //HTTP 200: OK (implícito)
             res.json(({auth: true, token}))
        }
        else { // Senha inválida
            res.status(401).end()
        }
    }
}
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller