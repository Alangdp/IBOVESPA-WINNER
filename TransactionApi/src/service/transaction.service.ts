import { ModelStatic, Optional } from 'sequelize';

import dotenv from 'dotenv';
import { Transaction } from '../models/Transaction';
import { TransactionsProps } from '../types/transaction.type';
import { response } from '../utils/Responses';

dotenv.config();

class TransactionService {
  private model: ModelStatic<Transaction>;

  constructor() {
    this.model = Transaction;
    return this;
  }

  async findAll(userId: number) {
    const transactions: Transaction[] = await this.model.findAll({
      where: {userId: userId}
    });
    return transactions;
  }

  async create(userId: number, transaction: TransactionsProps) {
    const newTransaction = await this.model.create({
      ...transaction,
      userId: userId,
      totalValue: transaction.price * transaction.quantity,
    });
    return newTransaction;
  }

  async deleteUserTransaction(transactionId: number, userId: number) {
    const transaction = await this.model.findByPk(transactionId);
    if (!transaction) throw new Error('Invalid Transaction ID');
    if (transaction.userId !== userId)
      throw new Error('Transaction does not belong to the user');
    await transaction.destroy();
  }

  async editTransaction(
    transactionId: number,
    userId: number,
    updateTransaction: TransactionsProps
  ) {
    const transaction = await this.model.findByPk(transactionId);
    if (!transaction) throw new Error('Invalid Transaction ID');
    if (transaction.userId !== userId)
      throw new Error('Transaction does not belong to the user');
    const newTransaction = await transaction.update({ ...updateTransaction });
    return newTransaction;
  }
}

export default TransactionService;
