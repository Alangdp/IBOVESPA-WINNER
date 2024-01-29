import { Transaction } from '../Entities/Transaction.js';
import { Chart } from './Chart.type.js';
import { DividendOnDate } from './dividends.type.js';
import { StockInfo } from './stock.types.js';
import { StockPrice } from './stock.types.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: Transaction[];
    chart?: Chart;
  };
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: Transaction[];
}
