'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'usuarios', //nome da tabela
      'data_nasc', // nome do campo
      {
        type: sequelize.DATE,
        allowNull: false // So é possivel ser usado quando não tem um aluno já criado.
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'usuarios',
      'data_nasc'
    )
  }
};
