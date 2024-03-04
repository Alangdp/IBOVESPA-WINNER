// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS

import { BuyTransactionProcol } from '../interfaces/TransactionBuyProtocol.type';
import { Transaction } from '../interfaces/TransactionProtocol.js';
import { TransactionProps } from '../types/transaction.type';
import { TransactionHistory } from '../interfaces/Transaction';

export default class BuyTransaction
  extends Transaction
  implements BuyTransactionProcol, TransactionHistory
{
  ticker: string;

  private constructor(
    requirements: TransactionProps,
    buyData: {
      ticker: string;
    }
  ) {
    super(requirements);

    this.ticker = buyData.ticker;
  }

  static create(
    requirements: TransactionProps,
    sellData: {
      ticker: string;
    }
  ) {
    return new BuyTransaction(requirements, sellData);
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  getTicker(): string {
    return this.ticker;
  }
}

export { BuyTransaction };
