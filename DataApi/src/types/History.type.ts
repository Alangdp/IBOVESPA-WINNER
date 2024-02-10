import { ChartProtocol } from '../interfaces/ChartProtocol.type.js';
import { TransactionProtocol } from '../interfaces/TransactionBuyProtocol.type.js';
import { DividendOnDate } from './dividends.type.js';
import { StockInfo, StockPrice } from './stock.types.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: TransactionProtocol[];
    chart?: ChartProtocol;
  };
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: TransactionProtocol[];
}
