var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('transactions');
        });
    },
};
export {};
