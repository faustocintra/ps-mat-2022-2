'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'usuarios',
      'data_nasc',{
        type: Sequelize.DATE,
        allowNull: false,
        after: "email"
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'usuarios',
      'data_nasc',
    )
  }
};
