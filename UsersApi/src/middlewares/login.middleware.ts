import type { RequestType } from '../../types/global.js';
import dotenv from 'dotenv';

dotenv.config();

import { Response, NextFunction } from 'express';
import { resp } from '../utils/resp.js';
import axios from 'axios';

const loginRequired = async (req: RequestType, res: Response, next: NextFunction) => {
  const TOKEN_URL = process.env.TOKEN_URL as string

  try {
    const { token } = req.body;
    if(!token) throw new Error("Invalid Token");

    const response = await axios.post(`${TOKEN_URL}user`, {
      authorization: process.env.SECRET_TOKEN,
      token: token
    })
    req.body.id = response.data.userData.id
    next()
  } catch (error: any) {
    console.log(error)
    return res.status(403).json({msg: error.message})
  }
};

export default loginRequired;
