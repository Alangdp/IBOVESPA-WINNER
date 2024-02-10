// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS

import { Transaction } from '../interfaces/TransactionProtocol';
import { SellTransactionProcol } from '../interfaces/TransactionSellProtocol.type';
import { TransactionProps } from '../types/transaction.type';
import { TransactionHistory } from './Transaction';

export default class SellTransaction
  extends Transaction
  implements SellTransactionProcol, TransactionHistory
{
  ticker: string;

  private constructor(
    requirements: TransactionProps,
    sellData: {
      ticker: string;
    }
  ) {
    super(requirements);

    this.ticker = sellData.ticker;
  }

  create(
    requirements: TransactionProps,
    sellData: {
      ticker: string;
    }
  ) {
    return new SellTransaction(requirements, sellData);
  }

  getTicker(): string {
    return this.ticker;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }
}

export { SellTransaction };
