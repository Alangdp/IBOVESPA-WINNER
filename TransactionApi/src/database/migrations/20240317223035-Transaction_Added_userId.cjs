/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('transactions', 'userId', {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('transactions', 'userId');
  },
};
