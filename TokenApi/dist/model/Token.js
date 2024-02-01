import { Model } from 'sequelize';
import sequelize from 'sequelize';
import database from '../database/index.js';
class Token extends Model {
}
Token.init({
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
            model: 'users',
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
}, {
    sequelize: database,
    tableName: 'tokens',
    underscored: true,
    timestamps: true,
});
export default Token;
