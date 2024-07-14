import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import TransactionService from '../services/transaction.service';
import { TokenService } from '../services/token.service';
import { errorResponse, response } from '../utils/Responses';

dotenv.config();

const tokenService = new TokenService();

export const index: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();
  try {
    const token = req.body.token;
    const userId = await tokenService.getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');

    const transactions = await service.findAllByUserId(userId);
    return response(res, { status: 200, data: transactions });
  } catch (error: any) {
    console.log(error);
    return errorResponse(res, error);
  }
};
