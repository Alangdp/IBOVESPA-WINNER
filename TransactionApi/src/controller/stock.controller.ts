import { RequestHandler } from "express";
import { getUserIdByToken } from "../utils/getter";
import { TransactionsProps } from "../types/transaction.type";
import TransactionService from "../service/transaction.service";
import { validTypes } from "../types/validTypes";


export const makeTransaction: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  try {
    const token = req.body.token;
    const transaction: TransactionsProps = req.body.transaction
    const userId = await getUserIdByToken(token);
    if (!userId) throw new Error('Invalid Token');
    if(! validTypes.includes(transaction.type)) throw new Error('Invalid transaction type');

    const data = await service.create(userId, transaction);
    if(data.status === 500) throw new Error(data.message);

    return res.status(200).json({ transaction: data.data, msg: data.message});
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteTransaction: RequestHandler = async (req, res, next) => {
  const service = new TransactionService();

  try {
    const transactionId: string = req.params.id;
    const token = req.body.token;
    const userId = await getUserIdByToken(token);
    if(!userId) throw new Error('Invalid Token');
    const data = await service.deleteUserTransaction(Number(transactionId), userId);
    if(data.status === 500) throw new Error(data.message);

    return res.status(200).json({ transactionDeleted: data.data, msg: data.message});
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

