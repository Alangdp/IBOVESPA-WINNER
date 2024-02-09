import TransactionProtocol from '../interfaces/TransactionProtoca.type';
import {
  TransactionCodes,
  TransactionRequirements,
} from '../types/transaction.type';

// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS

export default class Transaction implements TransactionProtocol {
  private ticker: string;
  private quantity: number;
  private price: number;
  private total_value: number;
  private transaction_date: string;
  private user_id: number;
  private type: string;

  codes: TransactionCodes = {
    0: 'BUY',
    1: 'SELL',
    2: 'DIVIDEND',
    BUY: 0,
    SELL: 1,
    DIVIDEND: 2,
  };

  constructor(requirements: TransactionRequirements) {
    const { typeCode } = requirements;

    this.ticker = requirements.ticker;
    this.type = this.codes[typeCode];
    this.quantity = requirements.quantity;
    this.price = requirements.price;
    this.total_value = this.totalValue();
    this.transaction_date = DateFormatter.dateToString(
      requirements.transaction_date
    );
    this.user_id = requirements.user_id;
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
  getTotalValue(): number {
    return this.total_value;
  }
  getTransactionDate(): string {
    return this.transaction_date;
  }
  getUserId(): number {
    return this.user_id;
  }
  getType(): string {
    return this.type;
  }

  // TODO: IMPLEMENTAR BROKER
  // _broker_code: string

  isBuy() {
    return this.type === this.codes[0];
  }

  isSell() {
    return this.type === this.codes[1];
  }

  isDividend() {
    return this.type === this.codes[2];
  }

  totalValue() {
    return this.quantity * this.price;
  }
}

export { Transaction };
