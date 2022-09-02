const { DataTypes } = require("sequelize");
const db = require("../config/db");
// Decimal(18,2)

const model = db.define('Professor', {
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
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: DataTypes.CHAR(14),
        unique: true,
        allowNull: false
    },
    formacao: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    valor_hora_aula: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'professores'
});

model.sync(); // criar tabela caso não exista

module.exports = model;