'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sigla: {
        allowNull: false,
        type: Sequelize.CHAR(5),
        unique: true
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      duracao_meses: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: 6
      },
      carga_horaria: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue:80
      },
      valor_total: {
        allowNull: false,
        type: Sequelize.DECIMAL(18,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cursos');
  }
};