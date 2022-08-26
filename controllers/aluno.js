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

controller.create = async (req, res) => {
    try {
        await Aluno.create(req.body);

        res.status(201).end();
    }
    catch (error) {
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).send(error);
    }

}

controller.retrieve = async (req, res) => {
    try {
        const result = await Aluno.findAll()
        // HTTP 200: OK (implícito)
        res.send(result)
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const resul = await Aluno.findByPk(req.params.id)
        if(resul){
            //HTTP 200: Ok (implícito)
            res.send(resul)
        }else{
            //HTTP 404: nor found
            res.status(404).end()
        }
        res.send(result)
    }catch(error){
        console.error(error)
        //HTTP 599: INTERNAL SERVER ERROR
        res.status(500).send(error)
    }
}



controller.up = async (req, res) => {
    try{
        const resul = await Aluno.update(
            req.body,
            {where: {id: req.body.id}} 
            //{where: {id: req.params.id}}caso o id fosse 
            //passado na rota e nao na construção do corpo, e coloca o /:id na rota
            )
        if(resul[0] > 0){ //ele retorna a quantidade de registros alterados
            // encontrou e atualizo
            //204 = deu certo
            res.status(204).end()
        }else{
            //HTTP 404: nor found
            res.status(404).end()
        }
        res.send(result)
    }catch(error){
        console.error(error)
        //HTTP 599: INTERNAL SERVER ERROR
        res.status(500).send(error)
    }
}



module.exports = controller