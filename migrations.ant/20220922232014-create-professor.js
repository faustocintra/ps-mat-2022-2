'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('professor', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: Sequelize.CHAR(14),
        allowNull: false,
        unique: true
    },
    formacao: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    valor_hora_aula: {
        type: Sequelize.FLOAT(18,2),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    } 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
