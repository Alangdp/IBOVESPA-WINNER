import sequelize, { Model } from 'sequelize';
import database from '../database/sequelize';

class Token extends Model {
  public declare id: number;
  public declare token: string;
  public declare user_id: number;
  public declare readonly createdAt: Date;
  public declare readonly updatedAt: Date;
}

Token.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    token: {
      type: sequelize.STRING,
      allowNull: false,
    },

    user_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    createdAt: {
      field: 'createdAt',
      type: sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      field: 'updatedAt',
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'tokens',
    underscored: true,
    timestamps: true,
  }
);

export default Token;
