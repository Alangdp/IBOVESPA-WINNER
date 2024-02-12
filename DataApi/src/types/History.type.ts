import { TransactionHistory } from '../Entities/Transaction.js';
import { ChartProtocol } from '../interfaces/ChartProtocol.type.js';
import { DividendOnDate } from './dividends.type.js';
import { StockInfo, StockPrice } from './stock.types.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: TransactionHistory[];
    chart?: ChartProtocol;
  };
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: TransactionHistory[];
}
