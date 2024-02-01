'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
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
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: 0,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: 0,
            },
            transaction_type: {
                type: Sequelize.ENUM('buy', 'sell', 'fii', 'dividend'),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            total_value: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: 0,
            },
            broker_code: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            transaction_date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            stock_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
export {};
