import { Stock } from '../Entities/Stock.js';
import { transactions, Transaction } from '../Entities/Transaction.js';
import { Dividend } from '../types/dividends.type.js';
import { PriceHistory } from '../types/stock.types.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice[];
    dividends: DividendOnDate;
    transactions: Transaction[];
    chart?: any;
  };
}

export interface StockPrice {
  [ticker: string]: {
    price: number;
  };
}

export interface DividendOnDate {
  [ticker: string]: Dividend;
}

export interface StockInfo {
  [ticker: string]: {
    stock: Stock;
    dividend: Dividend[];
    historyPrice: PriceHistory[];
  };
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: Transaction[];
}
