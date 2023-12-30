import {
  TransactionCodes,
  TransactionRequirements,
} from '../types/transaction.type';
import Utilities from '../utils/Utilities.js';

class Transaction {
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

  // CRIAR AINDA
  // _broker_code: string

  constructor(requirements: TransactionRequirements) {
    const { typeCode } = requirements;

    this._ticker = requirements.ticker;
    this._type = Transaction.codes[typeCode];
    this._quantity = requirements.quantity;
    this._price = requirements.price;
    this._total_value = requirements.total_value;
    this._transaction_date = Utilities.formatDateToBR(
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
    total_value: quantity * price,
    transaction_date: transaction_date,
    user_id: user_id,
  };
}

const transactions: Transaction[] = [];
const startMonth = 1;
const startYear = 2023;

for (let i = 0; i < 10; i++) {
  const price = Math.floor(Math.random() * (56 - 32 + 1)) + 32;
  const transactionDate = new Date(
    startYear,
    startMonth + i,
    Math.round(Math.random() * (30 - 5)) + 5
  );
  const transactionRequirements: TransactionRequirements = makeRequirements(
    'BBAS3',
    100,
    price,
    0,
    transactionDate,
    1
  );
  const transaction = new Transaction(transactionRequirements);
  transactions.push(transaction);
}

console.log(transactions);

export { transactions, Transaction };
