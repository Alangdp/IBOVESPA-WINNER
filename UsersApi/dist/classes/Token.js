var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import axios from 'axios';
class TokenPersistence {
    constructor() {
        this.token = null;
    }
    static tokenCreate(user) {
        const token = process.env.SECRET_TOKEN;
        return jwt.sign({ id: user.id }, token, { expiresIn: '1d' });
    }
    static genToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = TokenPersistence.tokenCreate(user);
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.token) {
                return this.token;
            }
            const response = yield axios.post('/token');
            this.token = response.data.token;
            return this.token;
        });
    }
    deleteToken() {
        return __awaiter(this, void 0, void 0, function* () {
            this.token = null;
        });
    }
}
