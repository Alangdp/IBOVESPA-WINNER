import { Model } from 'sequelize';
import sequelize from 'sequelize';
import database from '../database/sequelize';

export class Transaction extends Model {
  declare id: number;
  declare ticker: string;
  declare transactionDate: Date;
  declare price: number;
  declare quantity: number;
  declare totalValue: number;
  declare type: string;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Transaction.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: sequelize.INTEGER,
    },

    ticker: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 6],
          msg: 'Invalid Ticker Length',
        },
      },
    },

    transactionDate: {
      type: sequelize.DATE,
      allowNull: false,
    },

    price: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },

    quantity: {
      type: sequelize.INTEGER,
      allowNull: false,
    },

    totalValue: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },

    type: {
      type: sequelize.STRING,
      validate: {
        isValidType(value: string) {
          if (!/(DIVIDEND|BUY|JCP|SELL)/.test(value)) {
            throw new Error('Type not is Valid');
          }
        },
      },
    },

    userId: {
      type: sequelize.NUMBER,
      allowNull: false,
    },

    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },

    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  },
  {
    sequelize: database,
    tableName: 'transactions',
    underscored: false,
    timestamps: true,
  }
);
