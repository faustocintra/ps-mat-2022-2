const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.headers['x-access-token']

    if(! token) return res.status(403).send({
        auth: false,
        message: 'Nenum token fornecido'
    })

    jwt.verify(token, process.env.TOKEN_SECRET, (erro, decodificado) => {

    // Token inválido/expirado
    if(erro) return res.status(403).send({
        auth: false,
        message: 'Falha ao autenticar o token'
    })

    // O TOKEN ESTÁ OK!

    // Salva o id na request para uso posterior
    req.infoLogado = decodificado

    next();

    })
}