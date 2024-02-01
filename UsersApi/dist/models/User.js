var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model } from 'sequelize';
import sequelize from 'sequelize';
import bcryptjs from 'bcryptjs';
import database from '../database/index.js';
class User extends Model {
    login(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs.compare(password, this.password);
        });
    }
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
User.addHook('beforeSave', (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = 10;
    const hash = yield bcryptjs.hash(user.password, salt);
    user.password = hash;
}));
export default User;
