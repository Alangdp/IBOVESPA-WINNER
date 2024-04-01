import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import TransactionService from '../service/transaction.service';
import { getUserIdByToken } from '../utils/getter';
import { errorResponse, response } from '../utils/Responses';

dotenv.config();

export const index: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();
  try {
    const token = req.body.token;
    const userId = await getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');

    const transactions = await service.findAll(userId);
    return response(res, {status: 200, data: transactions});
  } catch (error: any) {
    console.log(error)
    return errorResponse(res, error);
  }
};
