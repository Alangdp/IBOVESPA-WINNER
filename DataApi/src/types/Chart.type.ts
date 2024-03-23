import { DividendOnDate } from './dividends.type';
import { StockPrice } from './stock.types';

export interface ChartPortifolio {
  [ticker: string]: number;
}

export interface ChartConstructor {
  globalRentability: number;
  globalStockQuantity: number;
  globalStockValue: number;
  globalDividendValue: number;
  globalTotalValue: number;
  globalInvested: number;
  individualRentability: StockRentability;
}

export interface Chart {
  globalRentability: number;
  globalStockQuantity: number;
  globalStockValue: number;
  globalDividendValue: number;
  globalTotalValue: number;
  individualRentability: StockRentability;
}

export interface StockRentability {
  [ticker: string]: StockData;
}

export interface StockData {
  dividendValue: number;
  dividendPayments: string[];
  medianPrice: number;
  rentability: number;
  quantity: number;
  valueTotal: number;
  valueInvested: number;
}

export interface chartUpdateInfo {
  date: string;
  stocksPrice: StockPrice;
  dividendsPaymentOnDate: DividendOnDate;
  previousDate: string | null;
}
