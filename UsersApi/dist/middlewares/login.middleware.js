var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
const loginRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const TOKEN_URL = process.env.TOKEN_URL;
    try {
        const { token } = req.body;
        if (!token)
            throw new Error("Invalid Token");
        console.log(`${TOKEN_URL}user`);
        const response = yield axios.post(`${TOKEN_URL}user`, {
            authorization: process.env.SECRET_TOKEN,
            token: token
        });
        req.body.id = response.data.userData.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ msg: error.message });
    }
});
export default loginRequired;
