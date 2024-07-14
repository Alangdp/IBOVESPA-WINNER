import { RequestHandler } from 'express';
import { TransactionsProps } from '../types/transaction.type';
import { TokenService } from '../services/token.service';
import { validTypes } from '../types/transaction.type';
import { errorResponse, response } from '../utils/Responses';
import TransactionService from '../services/transaction.service';

const tokenService = new TokenService();
const transactionService = new TransactionService();

export const makeTransaction: RequestHandler = async (req, res, next) => {
  try {
    const token = req.body.token;
    const transaction: TransactionsProps = req.body.transaction;
    const userId = await tokenService.getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');
    if (!validTypes.includes(transaction.type))
      throw new Error('Invalid transaction type');
    const newTransaction = await transactionService.create(userId, transaction);
    return response(res, { status: 200, data: newTransaction });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export const deleteTransaction: RequestHandler = async (req, res, next) => {
  try {
    const transactionId: string = req.params.id;
    const token = req.body.token;
    const userId = await token(token);
    if (!userId) throw new Error('Invalid Token');
    await transactionService.deleteUserTransaction(
      Number(transactionId),
      userId
    );
    return response(res, { status: 200 });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export const editTransaction: RequestHandler = async (req, res, next) => {
  try {
    const transactionId: string = req.params.id;
    const token = req.body.token;
    const transaction: TransactionsProps = req.body.transaction;
    const userId = await tokenService.getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');
    const data = await transactionService.editTransaction(
      Number(transactionId),
      userId,
      transaction
    );
    return response(res, { status: 200, data: data });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};
