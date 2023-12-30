import {
  LastDividendPayment,
  Dividends,
  Dividend,
} from '../types/dividends.type';
import { PriceHistory } from '../types/stock.types';
import { Stock } from './Stock.js';
import instanceStock from './instance.js';

import { transactions, Transaction } from './Transaction.js';
import Utilities from '../utils/Utilities.js';
import { MainPrices } from '../types/prices.type.js';

type DividendPayment = LastDividendPayment;

interface HistoryRequirements {
  priceHistory: PriceHistory[];
  dividends: DividendPayment[];
  transactions: Transaction[];
}

interface HistoryInfo {
  [date: string]: {
    date: string;
    transactions: Transaction[];
    dividends: Dividends;
  };
}

class History {
  private _historyInfo: HistoryInfo;
  private _priceHistory: PriceHistory[];
  private _dividends: DividendPayment[];
  private _transactions: Transaction[];

  constructor(requirements: HistoryRequirements) {
    const { priceHistory, dividends, transactions } = requirements;

    this._priceHistory = priceHistory;
    this._dividends = dividends;
    this._transactions = transactions;
    this._historyInfo = {};

    this.makeBasicHistory();
  }

  public get priceHistory() {
    return this._priceHistory;
  }

  public get historyInfo() {
    return this._historyInfo;
  }

  public get dividends() {
    return this._dividends;
  }

  public get transactions() {
    return this._transactions;
  }

  formateDate(stringDate: string): string {
    const [day, month, year] = stringDate.split('/');
    return `${day}/${month}/${Number(year.split(' ')[0]) + 2000}`;
  }

  transactionsOnDate(date: string): Transaction[] {
    const transactionsOnDate: Transaction[] = [];

    for (const transaction of this.transactions) {
      const { transaction_date: transactionDate } = transaction;

      if (transactionDate === date) transactionsOnDate.push(transaction);
    }

    return transactionsOnDate;
  }

  dividendsOnDate(date: string) {
    const dividendsOnDate: Dividends = {};

    for (const dividend of this.dividends) {
      const { dataCom, dataEx, dividendType, value, ticker } = dividend;

      console.log(date, dataCom, date === dataCom, 'DATAS DO DIVIDENDO');
      if (dataEx === date || dataCom === date) {
        if (!dividendsOnDate[ticker]) dividendsOnDate[ticker] = [];
        const dividend: Dividend = {
          date: date,
          ticker: ticker,
          value: value,
          type: dividendType,
        };

        dividendsOnDate[ticker].push(dividend);
      }
    }

    return dividendsOnDate;
  }

  makeBasicHistory() {
    const { priceHistory } = this;

    for (const priceInfo of priceHistory) {
      const { price, date } = priceInfo;

      const formatedDate = this.formateDate(date);
      this._historyInfo[formatedDate] = {
        date: formatedDate,
        transactions: this.transactionsOnDate(formatedDate),
        dividends: this.dividendsOnDate(formatedDate),
      };
    }
  }
}
async function instanceHistory(ticker: string): Promise<History> {
  const stock = await instanceStock(ticker);
  const history = new History({
    priceHistory: stock.priceHistory,
    dividends: stock.lastDividendsValue,
    transactions,
  });

  console.log(history.historyInfo);

  return history;
}

instanceHistory('TAEE11');
