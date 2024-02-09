import { Variable } from '../Entities/Variable';
import { LastDividendPayment } from '../types/dividends.type';
import {
  Indicators,
  NetLiquid,
  PassiveChartReturn,
} from '../types/stock.types';

export interface StockProtocol extends Variable {
  calculateRentability(actualPrice: number, referencePrice: number): number;

  instaceTime: number;
  lastDividendsAverage?: number;
  dividendYield: number;
  grossDebt: number;
  patrimony: number;
  lastDividendsYieldYear: number[];
  lastDividendsValueYear: number[];
  lastDividendsValue: LastDividendPayment[];
  payout: number;
  actualDividendYield: number;
  netLiquid: NetLiquid[];
  passiveChart: PassiveChartReturn[];
  indicators: Indicators;
}
