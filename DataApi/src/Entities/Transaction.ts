import {
  TransactionCodes,
  TransactionRequirements,
} from '../types/transaction.type';

import { CodesString, CodesNumber } from '../types/codes.type';

import HistoryUtils from '../utils/HistoryUtils.js';

export default class Transaction {
  public static codes: TransactionCodes = {
    0: 'BUY',
    1: 'SELL',
    2: 'DIVIDEND',
    BUY: 0,
    SELL: 1,
    DIVIDEND: 2,
  };

  private _ticker: string;
  private _quantity: number;
  private _price: number;
  private _total_value: number;
  private _transaction_date: string;
  private _user_id: number;
  private _type: string;

  // TODO: IMPLEMENTAR BROKER
  // _broker_code: string

  isBuy() {
    return this._type === Transaction.codes[0];
  }

  isSell() {
    return this._type === Transaction.codes[1];
  }

  isDividend() {
    return this._type === Transaction.codes[2];
  }

  calculeteTransactionValue() {
    return this._quantity * this._price;
  }

  constructor(requirements: TransactionRequirements) {
    const { typeCode } = requirements;

    this._ticker = requirements.ticker;
    this._type = Transaction.codes[typeCode];
    this._quantity = requirements.quantity;
    this._price = requirements.price;
    this._total_value = this.calculeteTransactionValue();
    this._transaction_date = HistoryUtils.dateToString(
      requirements.transaction_date
    );
    this._user_id = requirements.user_id;
  }

  get ticker() {
    return this._ticker;
  }

  get quantity() {
    return this._quantity;
  }

  get price() {
    return this._price;
  }

  get total_value() {
    return this._total_value;
  }

  get transaction_date() {
    return this._transaction_date;
  }

  get user_id() {
    return this._user_id;
  }

  get type() {
    return this._type;
  }
}

function makeRequirements(
  ticker: string,
  quantity: number,
  price: number,
  typeCode: 0 | 1 | 2,
  transaction_date: Date,
  user_id: number
): TransactionRequirements {
  return {
    ticker: ticker,
    quantity: quantity,
    price: price,
    typeCode: typeCode,
    transaction_date: transaction_date,
    user_id: user_id,
  };
}

export { Transaction };
