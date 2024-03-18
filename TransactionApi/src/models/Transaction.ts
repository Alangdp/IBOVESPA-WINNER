import { Model } from 'sequelize';
import sequelize from 'sequelize';
import database from '../database';

export class Transaction extends Model {
  public declare id: number;
  public declare ticker: string;
  public declare transactionDate: Date;
  public declare price: number;
  public declare quantity: number;
  public declare totalValue: number;
  public declare type: string;
  public declare userId: number;
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
    }
  },
  {
    sequelize: database,
    tableName: "Transactions",
    underscored: false,
    timestamps: true
  }
)
