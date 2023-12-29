import { BazinMethod } from './Bazin.js';
import { Variable } from './Variable.js';
import { LastDividendPayment } from './types/dividends.type.js';
import {
  StockRequirements,
  History,
  NetLiquid,
  Indicators,
} from './types/stock.types';

export class Stock extends Variable {
  private _Bazin: BazinMethod;
  private _lastDividendsAverage?: number;
  private _dividendYield: number;
  private _grossDebt: number;
  private _patrimony: number;

  private _lastDividendsYieldYear: number[];
  private _lastDividendsValueYear: number[];
  private _lastDividendsValue: LastDividendPayment[];

  private _payout: number;
  private _actualDividendYield: number;
  private _netLiquid: NetLiquid[];

  private _indicators: Indicators;

  constructor(stock: StockRequirements) {
    super(
      stock.ticker,
      stock.name,
      stock.activeValue,
      stock.shareQuantity,
      stock.actualPrice,
      stock.history
    );

    const actualDividendYield = stock.actualDividendYield / 100;

    this._indicators = stock.indicators;
    this._dividendYield = stock.dividendYield;
    this._grossDebt = stock.grossDebt;
    this._patrimony = stock.patrimony;
    this._payout = stock.payout;
    this._actualDividendYield = actualDividendYield;

    this._lastDividendsYieldYear = stock.lastDividendsYieldYear;
    this._lastDividendsValueYear = stock.lastDividendsValueYear;
    this._lastDividendsValue = stock.lastDividendsValue;

    this._netLiquid = stock.netLiquid;
    this._Bazin = new BazinMethod(this);
  }

  get lastDividendsYieldYear() {
    return this._lastDividendsYieldYear;
  }

  get lastDividendsValueYear() {
    return this._lastDividendsValueYear;
  }

  get lastDividendsValue() {
    return this._lastDividendsValue;
  }

  calculateRentability() {
    return 0;
  }

  get netLiquid() {
    return this._netLiquid;
  }

  get actualDividendYield() {
    return this._dividendYield;
  }

  get dividendYield() {
    return this._dividendYield;
  }

  get grossDebt() {
    return this._grossDebt;
  }

  get patrimony() {
    return this._patrimony;
  }

  get payout() {
    return this._payout;
  }

  get lastDividendsAverage() {
    return this._lastDividendsAverage;
  }

  get indicators() {
    return this._indicators;
  }
}
