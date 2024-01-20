import { StockPrice } from './History.type';
import { DividendOnDate } from './dividends.type';

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

export interface chartUpdateInfo {
  date: string;
  stocksPrice: StockPrice;
  dividendsPaymentOnDate: DividendOnDate;
  previousDate: string | null;
}
