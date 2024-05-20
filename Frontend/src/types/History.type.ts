import { ChartProps } from "./Chart.type";
import { DividendOnDate } from "./Dividend.type";
import { IndexHistoryPrice, IndexDividend } from "./Index.type";
import { StockPrice, StockInfo } from "./Stock.type";
import { TransactionsProps } from "./Transaction.type";

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: TransactionsProps[];
    chart?: ChartProps;
  };
}

export interface HistoryProps {
  stockInfo: StockInfo;
  transactions: TransactionsProps[]
  historyData: HistoryData;
  chart: ChartProps
  indexHistoryPrice: IndexHistoryPrice;
  indexDividend: IndexDividend;
}

export interface SimplifiedHistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: TransactionsProps[];
    chart?: ChartProps;
  };
}

export interface SimplifiedDataHistory {
  historyData: {
    [date: string]: {
      dividends: DividendOnDate;
      chart?: ChartProps;
    };
  };
  chart: ChartProps;
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: TransactionsProps[];
}
