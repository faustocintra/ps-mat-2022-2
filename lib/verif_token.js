const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).send({
        auth: false,
        message: "Nenhum token fornecido"
    });

    jwt.verify(token, process.env.TOKEN_SECRET, (erro, decodificando) =>{
        if (erro) return res.status(403).send({
            auth: false,
            message: "Falha ao autenticar o token"
        })

        req.infoUsuario = decodificando

        next();
    });
};