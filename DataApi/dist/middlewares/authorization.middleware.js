import dotenv from 'dotenv';
dotenv.config();
import { resp } from '../utils/resp.js';
import axios from 'axios';
const loginRequired = async (req, res, next) => {
    const TOKEN_URL = process.env.TOKEN_URL;
    try {
        const { token } = req.body;
        if (!token)
            throw new Error("Invalid Token");
        const response = await axios.post(`${TOKEN_URL}user`, {
            authorization: process.env.SECRET_TOKEN,
            token: token
        });
        req.body.id = response.data.userData.id;
        next();
    }
    catch (error) {
        console.log(error);
        resp(403, error.message, null, error);
        return res.status(403).json("DEU ERRO");
    }
};
export default loginRequired;
