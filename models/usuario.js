const { DataTypes } = require('sequelize');
const db = require('../config/db')



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
  hash_senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  admin:{ 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  data_nasc:{
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
    tableName: 'usuarios', // --
    scopes: {
      semSenha: {excludes: ['hash_senha']}
    }
});

model.sync(); // Criar a tabela caso n exista 

module.exports = model;