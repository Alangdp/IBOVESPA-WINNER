import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { UserResponse } from '../types/user.type';
import TransactionService from '../service/transaction.service';
import { getUserIdByToken } from '../utils/getter';

dotenv.config();

export const index: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  try {
    const token = req.body.token;
    const userId = await getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');

    const transactions = service.findAll(userId);
    return res
      .status(200)
      .json({ data: transactions, msg: 'Transactions Found' });
  } catch (error: any) {
    if (error.response.data) {
      return res.status(400).json({ msg: error.response.data.TokenMessage });
    }
    return res.status(400).json({ error: error.message });
  }
};
