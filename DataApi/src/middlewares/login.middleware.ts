import dotenv from 'dotenv';

dotenv.config();

import { Response, NextFunction, RequestHandler } from 'express';
import axios from 'axios';
import { errorResponse } from '../utils/Responses';

const loginRequired: RequestHandler = async (req, res, next) => {
  const TOKEN_URL = process.env.TOKEN_URL as string;
  try {
    const { token } = req.body;
    if (!token) throw new Error('Invalid Token');

    const response = await axios.post(`${TOKEN_URL}user`, {
      authorization: process.env.SECRET_TOKEN,
      token: token,
    });

    req.body.id = response.data.data.id;
    next();
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export default loginRequired;
