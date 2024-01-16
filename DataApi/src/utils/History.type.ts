import { Stock } from '../Entities/Stock.js';
import { transactions, Transaction } from '../Entities/Transaction.js';
import { Dividend } from '../types/dividends.type.js';
import { PriceHistory } from '../types/stock.types.js';

export interface HistoryData {
  [date: string]: {
    date: string;
    prices: StockPrice;
    dividends: DividendOnDate;
    transactions: Transaction[];
    chart?: Chart;
  };
}

export interface Chart {
  globalRentabily: number;
  globalStockQuantity: number;
  globalStockValue: number;
  globalDividendValue: number;
  globalTotalValue: number;
  individualRentability: stockRentability;
}

export interface stockRentability {
  [ticker: string]: {
    dividendValue: number;
    dividendPayments: string[];
    medianPrice: number;
    rentability: number;
    quantity: number;
    valueTotal: number;
    valueInvested: number;
  };
}

export interface StockPrice {
  [ticker: string]: {
    ticker: string;
    price: number;
  };
}

export interface chartUpdateInfo {
  date: string;
  stocksPrice: StockPrice;
  dividendsPaymentOnDate: DividendOnDate;
  previousDate: string | null;
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

export interface StocksPortfolio {
  [ticker: string]: {
    quantity: number;
    value: number;
    porcentage: number;
  };
}

export interface HistoryRequirements {
  stockInfo: StockInfo;
  transactions: Transaction[];
}
