import { ModelStatic, Optional } from 'sequelize';

import dotenv from 'dotenv';
import { Transaction } from '../models/Transaction';
import { TransactionsProps } from '../types/transaction.type';
import { response } from '../utils/Responses';
import { TokenService } from './token.service';

dotenv.config();

class TransactionService {
  private model: ModelStatic<Transaction>;
  private tokenService: TokenService;

  constructor() {
    this.model = Transaction;
    this.tokenService = new TokenService();
    return this;
  }

  async findAllByUserId(userId: number) {
    const transactions: Transaction[] = await this.model.findAll({
      where: { userId: userId },
    });
    return transactions;
  }

  async findAllByUserToken(token: string): Promise<TransactionsProps[]> {
    const userId = await this.tokenService.getUserIdByToken(token);
    const transactions: Transaction[] = await this.model.findAll({
      where: { userId: userId },
    });

    const transacitonData: TransactionsProps[] = transactions.map(
      (transaction) => {
        return {
          id: transaction.id,
          ticker: transaction.ticker,
          transactionDate: transaction.transactionDate,
          price: transaction.price,
          quantity: transaction.quantity,
          totalValue: transaction.totalValue,
          type: transaction.type,
          userId: transaction.userId,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
        };
      }
    );

    return transacitonData;
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
