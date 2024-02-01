import { Model } from 'sequelize';
import sequelize from 'sequelize';
import database from '../database/index.js';
class User extends Model {
}
User.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name is required' },
            len: {
                args: [4, 100],
                msg: 'Name must be between 4 and 100 characters',
            },
        },
    },
    password: {
        type: sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Password is required' },
            len: {
                args: [4, 100],
                msg: 'Password must be between 4 and 100 characters',
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                msg: 'Password must have at least one special character, one number, one lowercase and one uppercase letter',
            },
        },
    },
    cpf: {
        type: sequelize.STRING(11),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'CPF is required' },
            len: {
                args: [11, 11],
                msg: 'CPF must have 11 characters',
            },
        },
    },
    email: {
        type: sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Email is required' },
            len: {
                args: [4, 100],
                msg: 'Email must be between 4 and 100 characters',
            },
            isEmail: {
                msg: 'Email must be valid',
            },
        },
    },
    phone: {
        type: sequelize.STRING(11),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Phone is required' },
            len: {
                args: [11, 11],
                msg: 'Phone must have 11 characters',
            },
        },
    },
    active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    admin: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        field: 'createdAt',
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
    },
    updatedAt: {
        field: 'updatedAt',
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
    },
}, {
    sequelize: database,
    tableName: 'users',
    underscored: true,
    timestamps: true,
});
export default User;
