import { ModelStatic, Optional } from 'sequelize';

import dotenv from 'dotenv';
import { Transaction } from '../models/Transaction';
import { resp } from '../utils/resp';
import { TransactionsProps } from '../types/transaction.type';

dotenv.config();

class TransactionService {
  private model: ModelStatic<Transaction>;

  constructor() {
    this.model = Transaction;
    return this;
  }

  async findAll(userId: number) {
    try {
      const transactions: Transaction[] = await this.model.findAll({where: {userId: userId} });
      return resp(200, "Found Data", transactions);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }

  async create(userId: number, transaction: TransactionsProps) {
    try {
      const newTransaction = await this.model.create({
        userId: userId,
        totalValue: transaction.price * transaction.quantity,
        ...transaction
      })

      return resp(200, "Found Data", newTransaction);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }

  async deleteUserTransaction(transactionId: number, userId: number) {
    try {
      const transaction = await this.model.findByPk(transactionId);
      if(!transaction) throw new Error("Invalid Transaction ID");
      if(transaction.userId !== userId) throw new Error("Transaction does not belong to the user");
      await transaction.destroy()
      return resp(200, "Transaction Deleted", transaction);
    } catch (error: any) {
      return resp(500, error.message, null, error);
    }
  }
}

export default TransactionService;
