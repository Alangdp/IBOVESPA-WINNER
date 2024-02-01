import { BazinMethod } from './Bazin.js';
import { GranhamMethod } from './Graham.js';
import { Variable } from './Variable.js';
import { LastDividendPayment } from '../types/dividends.type.js';
import {
  StockRequirements,
  PriceHistory,
  NetLiquid,
  Indicators,
  PassiveChartReturn,
} from '../types/stock.types.js';
import instanceStock from './instanceStock.js';

export class Stock extends Variable {
  calculateRentability(actualPrice: number, referencePrice: number): number {
    return ((actualPrice - referencePrice) / referencePrice) * 100;
  }
  // FIXME - Soluções temporárias

  public instaceTime: number;

  public lastDividendsAverage?: number;
  public dividendYield: number;
  public grossDebt: number;
  public patrimony: number;

  public lastDividendsYieldYear: number[];
  public lastDividendsValueYear: number[];
  public lastDividendsValue: LastDividendPayment[];

  public payout: number;
  public actualDividendYield: number;
  public netLiquid: NetLiquid[];
  public passiveChart: PassiveChartReturn[];

  public indicators: Indicators;

  constructor(stock: StockRequirements) {
    super(
      stock.ticker,
      stock.name,
      stock.activeValue,
      stock.shareQuantity,
      stock.actualPrice,
      stock.priceHistory
    );

    const actualDividendYield = stock.actualDividendYield / 100;

    this.indicators = stock.indicators;
    this.dividendYield = stock.dividendYield;
    this.grossDebt = stock.grossDebt;
    this.patrimony = stock.patrimony;
    this.payout = stock.payout;
    this.actualDividendYield = actualDividendYield;

    this.lastDividendsYieldYear = stock.lastDividendsYieldYear;
    this.lastDividendsValueYear = stock.lastDividendsValueYear;
    this.lastDividendsValue = stock.lastDividendsValue;

    this.netLiquid = stock.netLiquid;
    this.passiveChart = stock.passiveChart;
    this.instaceTime = new Date().getTime();
  }
}
