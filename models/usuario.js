const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    hash_senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    data_nasc: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: 'usuarios'
});

// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model

