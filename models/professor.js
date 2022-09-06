const { DECIMAL } = require('sequelize');
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('Professor', {
// Model attributes are defined here
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
},
nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
},
cpf: {
    type: DataTypes.CHAR(14),
    allowNull: false
},

formacao: {
    type: DataTypes.CHAR(200),
    allowNull: false
},
valorhoraaula:{
    type: DataTypes.DECIMAL(18,2),
    allowNull: false
},
email:{
    type: DataTypes.CHAR(100),
    allowNull: false
}


}, {
    tableName: 'professor'
});

// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model
