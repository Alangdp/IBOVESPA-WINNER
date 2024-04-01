
import { ChartProtocol } from '../interfaces/ChartProtocol.type.js';
import { DividendOnDate } from './dividends.type.js';
import { StockInfo, StockPrice } from './stock.types.js';
import { TransactionsProps } from './transaction.type.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: TransactionsProps[];
    chart?: ChartProtocol;
  };
}
export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: TransactionsProps[];
}
