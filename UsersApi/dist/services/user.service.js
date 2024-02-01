var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User.js';
import { resp } from '../utils/resp.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
class UserService {
    constructor() {
        this.model = User;
        return this;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.findByPk(id);
                if (!user)
                    return resp(404, 'User not found', null);
                return user;
            }
            catch (error) {
                return resp(500, error.message, null, error);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.model.findAll({});
                if (users.length === 0)
                    return resp(404, 'Users not found', null);
                return resp(200, 'Users found', users);
            }
            catch (error) {
                return resp(500, error.message, null, error);
            }
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.create(data);
                return resp(201, 'User created', user);
            }
            catch (error) {
                console.log(error);
                return resp(500, error.message, null, error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.destroy({ where: { id } });
                if (user === 0)
                    return resp(404, 'User not found', null);
                return resp(200, 'User deleted', user);
            }
            catch (error) {
                return resp(500, error.message, null, error);
            }
        });
    }
    validUserIsActive(user) {
        if (user.active)
            return true;
        return false;
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.findOne({ where: { email: data.email } });
                if (!user)
                    return resp(404, 'User not found', null);
                if (!this.validUserIsActive(user))
                    return resp(403, 'User not active', null);
                if (!(yield user.login(data.password)))
                    return resp(400, 'Invalid password', null);
                const response = yield axios.post(process.env.TOKEN_URL, {
                    authorization: process.env.SECRET_TOKEN,
                    userId: user.id,
                });
                const tokenResponse = response.data;
                return resp(200, 'User logged in', { user, token: tokenResponse });
            }
            catch (error) {
                console.log(error);
                return resp(500, error.message, null, error);
            }
        });
    }
}
export default UserService;
