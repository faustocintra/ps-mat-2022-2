const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('Usuario', {
// Model attributes are defined here
id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nome:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email:{
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  
  },
  hash_senha:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
    tableName: 'usuarios'
});

// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model

