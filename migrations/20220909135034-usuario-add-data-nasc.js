'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'usuarios', // nome da tabela
      'data-nasc', // nome do campo
      {
        type: Sequelize.DATE,
        allowNull: false // Se houvessem registros na tabela, não poderiamos usar o allowNull
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'usuarios',
      'data_nasc'
    )
  }
};
