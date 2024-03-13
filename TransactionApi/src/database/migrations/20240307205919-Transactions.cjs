/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('transactions', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      ticker: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 6],
            msg: 'Invalid Ticker Size',
          },
        },
      },

      transactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      totalValue: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
        validate: {
          is: {
            args: ['DIVIDEND', 'BUY', 'JCP', 'SELL'],
            msg: 'Type not is Valid',
          },
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
