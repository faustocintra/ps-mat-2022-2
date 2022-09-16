const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //Lê o token passado no cabeçalho da requisição
    console.log(req.headers)
    const token = req.headers['x-access-token']
    
    //Se o token nao existir, retorna HTTP 403: forbidden
    if (!token) return  res.status(403).send({
        auth: false,
        message: "Nenhum token fornecido"
    })

    //verifica se o token é valido e esta dentro do prazo de validade
    jwt.verify(token, process.env.TOKEN_SECRET, (erro, decodificado)=> {
        //token inválido/expirado
        if(erro) return res.status(403).send({
            auth: false,
            message: "Falha ao autenticar o token"
        })
        //O token está OK!

    //Salva o id na request para o uso posterior

    req .infoLogado = decodificado

    //Chama a proxima função do middleware
    next()
    })

    
}