const {DataTypes} =  require('sequelize')
const db = require('../config/db')

const model = db.define('Curso', {

    //id, nome, data_nascimento, cpf, formacao, valor_hora_aula, email

    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sigla: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true,
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    duracao_meses: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 6
    },
    carga_horaria: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 80
    },
    valor_total:{
        type: DataTypes.DECIMAL(18,2),
        allowNull: false
    },
},{ tableName: 'Cursos'});

model.sync();

module.exports = model;