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
    catch(error) {
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
        // HTTP 200: OK
        if (result) {
            res.send(result)
        } else {
            res.status(404).end
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
}

controller.update = async(req, res) => {
    try {
        const response = await Usuario.update(
            req.body,
            { where: { id: req.params.id }} 
        )

        console.log("======", {response})

        if(response[0] > 0) { // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        } else { // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const response = await Usuario.destroy(
            { where: { id: req.params.id }} 
        )

        // console.log("======", {response})

        if(response) { // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        } else { // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.body.email }})

        if(!usuario) { // Usuário não existe
            // HTTP 401: Unauthorized
            res.status(401).end()
        }
        else {
            let senhaOk = await bcrypt.compare(req.body.senha, usuario.hash_senha)

            if(senhaOk) {
                // Gera e retorna o token
                const token = jwt.sign({ id: usuario.id} , process.env.TOKEN_SECRET, { expiresIn: '8h' })

                // HTTP 200: OK (impl~icito)
                res.json({ auth: true, token })
            }
            else { // Senha inválida
                // HTTP 401: Unouthorized
                res.status(401).end()
            }
        }
    }
    catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports = controller