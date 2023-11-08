'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('stocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },

      ticker: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: {
            args: [5, 6],
            msg: 'Ticker must be between 5 and 6 characters',
          },
        },
      },

      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      sector: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },

        defaultValue: 0,
      },

      dividend_yield: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      dividend_decimals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      variation_last_12_months: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      free_flow: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      LPA: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      VPA: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      market_cap: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      net_equity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },

      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('stocks');
  },
};
