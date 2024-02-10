// import { TransactionProtocol } from 'sequelize';
import {
  ChartConstructor,
  Chart as ChartModel,
  ChartPortifolio,
  StockData,
} from '../types/Chart.type';
import { DividendOnDate } from '../types/dividends.type';
import { StockPrice } from '../types/stock.types';
import { TransactionProtocol } from './TransactionProtocol.type';
// import TransactionProtocol from './TransactionProtocol';

// FIXME ARRUMAR SOLID AQUI

export interface ChartProtocol extends ChartConstructor {
  makeEmptyChart(): void;
  createTickerOnChart(ticker: string): StockData;
  buyUpdate(
    individualChart: StockData,
    ticker: string,
    quantity: number,
    valueInvested: number
  ): void;

  sellUpdate(
    individualChart: StockData,
    ticker: string,
    quantity: number,
    valueInvested: number
  ): void;
  updateGlobals(): void;

  updateTickers(pricesOnDate: StockPrice, date: string): void;
  updateDividends(dividends: DividendOnDate, date: string): void;
  updateChart(
    transactions: TransactionProtocol[],
    prices: StockPrice,
    dividends: DividendOnDate,
    date: string
  ): this;

  makePortfolioChart(): ChartPortifolio;
  returnChart(): ChartModel;
}
