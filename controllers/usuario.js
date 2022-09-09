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

controller.create = async (req, res) => {
    try {
        await Usuario.create(req.body);

        res.status(201).end();
    }
    catch (error) {
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }

}

controller.retrieve = async (req, res) => {
    try {
        const result = await Usuario.findAll()
        res.send(result)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await Usuario.findByPk(req.params.id)

        if (!result) {
            res.status(404).send()
        } else {
            res.send(result)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}


controller.retrieveUpdate = async (req, res) => {
    try {
        const result = await Usuario.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (!result[0]) {
            res.status(404).send()
        }
        res.status(204).end();
    }
    catch (error) {
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const result = await Usuario.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (!result) {
            res.status(404).send()
        }

        res.status(204).end();
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        })

        if (!usuario) {
            res.status(401).send()
        } else {
            const senhaOk = await bcrypt.compare(senha, usuario.hash_senha)
            if (senhaOk) {
                const token = jwt.sign(
                    { id: usuario.id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '8h' })

                res.json({ auth: true, token })
            } else {
                res.status(401).end()
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};
module.exports = controller