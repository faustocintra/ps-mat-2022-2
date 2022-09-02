const Professor = require('../models/professor')

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
        await Professor.create(req.body);

        res.status(201).end();
    }
    catch (error) {
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }

}

controller.retrieve = async (req, res) => {

    try {
        const result = await Professor.findAll()
        res.send(result)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await Professor.findByPk(req.params.id)

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
        const result = await Professor.update(
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
        const result = await Professor.destroy(
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
module.exports = controller