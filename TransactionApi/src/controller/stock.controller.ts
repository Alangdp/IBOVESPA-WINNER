import { RequestHandler } from "express";
import { getUserIdByToken } from "../utils/getter";
import { TransactionsProps } from "../types/transaction.type";
import TransactionService from "../service/transaction.service";
import { validTypes } from "../types/validTypes";
import { errorResponse, response } from "../utils/Responses";


export const makeTransaction: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  console.log(req.body)
  try {
    const token = req.body.token;
    const transaction: TransactionsProps = req.body.transaction
    const userId = await getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');
    if(! validTypes.includes(transaction.type)) throw new Error('Invalid transaction type');
    const newTransaction = await service.create(userId, transaction);
    console.log(newTransaction)
    return response(res, {status: 200, data: newTransaction});
  } catch (error: any) {
    console.log(error)
    return errorResponse(res,error);
  }
}

export const deleteTransaction: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  try {
    const transactionId: string = req.params.id;
    const token = req.body.token;
    const userId = await getUserIdByToken(token);
    if(!userId) throw new Error('Invalid Token');
    await service.deleteUserTransaction(Number(transactionId), userId);
    return response(res, {status: 200});
  } catch (error: any) {
    return errorResponse(res, error);
  }
}

export const editTransaction: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  try {
    const transactionId: string = req.params.id;
    const token = req.body.token;
    const transaction: TransactionsProps = req.body.transaction
    const userId = await getUserIdByToken(token);
    if(!userId) throw new Error('Invalid Token');
    const data = await service.editTransaction(Number(transactionId), userId, transaction);
    return response(res, {status: 200, data: data});
  } catch (error: any) {
    return errorResponse(res, error);
  }
}

