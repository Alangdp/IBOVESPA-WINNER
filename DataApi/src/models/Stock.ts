import { Model } from 'sequelize';
import sequelize from 'sequelize';
import bcryptjs from 'bcryptjs';

import database from '../database/index.js';

class Stock extends Model {
  public declare id: number;
  public declare ticker: string;
  public declare company_name: string;
  public declare price: number;
  public declare type: string;
  public declare image_url: string;
  public declare created_at: Date;
  public declare updated_at: Date;
}

Stock.init(
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    ticker: {
      type: sequelize.STRING(6),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Ticker is required!',
        },
        len: {
          args: [5, 6],
          msg: 'Ticker must be between 5 and 6 characters',
        },
      },
    },

    company_name: {
      type: sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Company name is required',
        },
        len: {
          args: [4, 100],
          msg: 'Company name must be between 4 and 100 characters',
        },
      },
    },

    price: {
      type: sequelize.NUMBER,
      allowNull: false,
    },

    type: {
      type: sequelize.STRING(10),
      allowNull: true,
    },

    image_url: {
      type: sequelize.STRING(200),
      allowNull: false,
    },

    created_at: {
      type: sequelize.DATE,
      allowNull: false,
    },

    updated_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'stocks',
    timestamps: true,
    underscored: true,
  }
);
