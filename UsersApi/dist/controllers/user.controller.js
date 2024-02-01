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
import UserService from '../services/user.service.js';
class userController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService();
            try {
                const { status, message, data } = yield service.index();
                res.status(status).json({ message, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    turnToAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService();
            try {
                const userId = Number(req.params.userId);
                const user = yield service.findById(userId);
                if (!user || !(user instanceof User)) {
                    const status = 404;
                    const message = 'Usuário não encontrado';
                    return res.status(status).json({ message });
                }
                user.admin = true;
                yield user.save();
                const status = 200;
                const message = 'Usuário promovido a administrador com sucesso';
                const data = { user };
                res.status(status).json({ message, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService();
            try {
                const { status, message, data } = yield service.store(req.body);
                res.status(status).json({ message, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const service = new UserService();
                const { status, message, data } = yield service.delete(id);
                res.status(status).json({ message, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new UserService();
                const { status, message, data } = yield service.login(req.body);
                res.status(status).json({ message, data });
            }
            catch (error) {
                console.log(error, 1321312);
                next(error);
            }
        });
    }
}
export default new userController();
