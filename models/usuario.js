const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('Usuario', {
// Model attributes are defined here
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
    type:DataTypes.DATE,
    allowNull: false
  }

}, {
    tableName: 'usuarios',
    scopes: {
      semSenha: {
        attributes: {exclude: ['hash_senha']}
      }
    }
});

// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model



// const { DataTypes } = require('sequelize');
// const db = require('../config/db');


// module.exports = function() {

// const model = db.define('Aluno', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   nome: {
//     type: DataTypes.STRING(100),
//     // allowNull defaults to true
//     allowNull: false
//   },
//   data_nascimento: {
//     type: DataTypes.DATEONLY,
//     allowNull: false
//   },
//   doc_identidade: {
//     type: DataTypes.STRING(20),
//     allowNull: false
//   },
//   cpf: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//   },
//   logradouro: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//   },
//   num_imovel: {
//     type: DataTypes.STRING(10),
//     allowNull: false
//   },
//   complemento: {
//     type: DataTypes.STRING(50),
//     allowNull: true
//   },
//   bairro: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   },
//   uf: {
//     type: DataTypes.CHAR(2),
//     allowNull: false
//   },
//   telefone: {
//     type: DataTypes.STRING(20),
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   },
//   telefone: {
//     type: DataTypes.STRING(20),
//     allowNull: false
//   },
//   turma: {
//     type: DataTypes.CHAR(5),
//     allowNull: false
//   },
  

// }, {
//   tableName: 'alunos'
// });

// model.async()

// return model

// }
