const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
    try{

        if(!req.body.senha) return res.status(500).send({
            message: "Um campo 'Senha' deve ser fornecido"
        })

        //Gera uma senha hash encriptada
        req.body.hash_senha = await bcrypt.hash(req.body.senha, 12)

        //Apaga o campo senha para não disparar validação do sequelize

        delete req.body.senha

        await Usuario.create(req.body)
        //HTTP 201: Created
        res.status(201).end();
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retriveOne = async (req, res) => {

    try {
        const result = await Usuario.scope('semSenha').findByPk(req.params.id);
        // HTTP 200: OK (implícito)
        !result && res.status(404).end;
        res.send(result)

    } catch(error) {
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

controller.update = async (req, res) =>{

    try {
        //Se existir senha em req.body, gerar senha criptografada
        if(req.body.senha){
            req.body.hash_senha = bcrypt.hash(req.body.senha, 12)
            delete req.body.senha
        }

        const response = await Usuario.update(
            req.body,
            {where : {id: req.params.id}}
        )

        if(response[0] > 0){
            res.status(204).end()
        }else{
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) =>{
    try {
        
        const response = await Usuario.destroy(
            {
                where: {id : req.params.id}
            }
        )

        if(response){
             // HTTP 204: OK (implícito)
            res.status(204).end()
        }else{
            res.status(404).end()
        }

    } catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async(req, res) =>{
    try {
        const usuario = await Usuario.findOne({where: {email: req.body.email}})
        
        if(!usuario){
            
            res.status(401).end();
        }else{

            console.log(usuario.hash_senha)
            console.log(req.body.senha)
            
            let senhaOK = await bcrypt.compare(req.body.senha, usuario.hash_senha);



            if(senhaOK){

                const token = jwt.sign(
                    {
                        id :  usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        admin: usuario.admin,
                        data_nasc: usuario.data_nasc
                    },
                    process.env.TOKEN_SECRET,
                    {expiresIn: "8h"}
                )
                
                res.json({auth: true, token})
            }else{
                
                res.status(401).end()
            }
        }



    } catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller