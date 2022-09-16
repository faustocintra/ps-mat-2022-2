const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario.js')

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

        // O usuário precisa ter passado um campo chamado "senha"
        if (!req.body.senha) return res.status(500).send({
            message: 'Um campo "senha" deve ser fornecido'
        })

        // Encripta a senha aberta passada no campo "senha"
        // gerando o campo "hash_senha"
        req.body.hash_senha = await bcrypt.hash(req.body.senha, 12)

        // Apaga o campo "senha" para não disparar validação do Sequelize
        delete req.body.senha

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
        const result = await Usuario.scope('semSenha').findAll()
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
        const result = await Usuario.scope('semSenha').findByPk(req.params.id)

        if(result) {
            // HTTP 200: OK (implícito)
            res.send(result)
        }
        else {
            // HTTP 404: Not found  
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
    //console.log('==============>', req.params.id)
    try {

        // Se o campo "senha" existir em req.body,
        // precisamos gerar a versão criptografado
        // da nova senha
        if (req.body.senha) {
            req.body.hash_senha = bcrypt.hash(req.body.senha, 12)
            delete req.body.senha
        }

        const response = await Usuario.update(
            req.body, 
            { where: { id: req.params.id } }
        )

        // console.log("======>", {response})

        if(response[0] > 0) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
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
            { where: { id: req.params.id } }
        )

        // console.log("======>", {response})

        if(response) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async(req, res) => {
    try {
        const usuario = await Usuario.findOne({where: {email: req.body.email}})

        if (!usuario) { // Usuário não existe
            res.status(401).end()
        }
        else {
           let senhaOK = await bcrypt.compare(req.body.senha, usuario.hash_senha)

           if (senhaOK) {
                // Gera e retorna o token
                const token = jwt.sign(
                    {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    admin: usuario.admin,
                    data_nasc: usuario.data_nasc
                    },
                    process.env.TOKEN_SECRET,
                    {expiresIn: '8h'}
                )
                
                //HTTP 200 - OK
                res.json({auth: true, token})
            }
            else { // Senha inválida
                res.status(401).end()
            }
        }
    } 
    catch (error) {  
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller