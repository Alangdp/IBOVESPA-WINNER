import { StockProtocol } from '../interfaces/StockProtocol.type.js';
import { LastDividendPayment } from '../types/dividends.type.js';
import {
  Indicators,
  NetLiquid,
  PassiveChartReturn,
  StockRequirements,
} from '../types/stock.types.js';
import { Variable } from './Variable.js';

export class Stock extends Variable implements StockProtocol {
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

    const actualDividendYield = stock.actualDividendYield;

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
