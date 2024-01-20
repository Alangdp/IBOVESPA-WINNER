import { Pontuation } from '../types/stock.types';
import { Stock } from './Stock';
import Utilities from '../utils/Utilities.js';

export class BazinMethod {
  private actualDividends: number;
  private points = 0;
  private maxPrice?: number;
  private dividendYieldMedian: number;
  private dividendYieldAverage: number;

  private lastDividendsValue: number[] = [];
  private lastDividendsYield: number[] = [];

  constructor(private stock: Stock) {
    const {
      dividendYield,
      actualPrice,
      lastDividendsYieldYear,
      lastDividendsValueYear,
      activeValue,
    } = this.stock;
    const lastDividendsValue = lastDividendsValueYear.splice(0, 5);
    const lastDividendsYield = lastDividendsYieldYear.splice(0, 5);

    this.lastDividendsValue = lastDividendsValue;
    this.lastDividendsYield = lastDividendsYield;

    this.dividendYieldAverage = this.stock.makeAverage(lastDividendsYield);
    this.dividendYieldMedian = this.stock.makeMedian(lastDividendsYield);

    this.actualDividends = actualPrice * dividendYield;
    this.maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;
    this.validate();

    this.makePoints();
  }

  private validate() {
    const { grossDebt, patrimony } = this.stock;
    const { lastDividendsYield } = this;

    if (grossDebt === null || grossDebt === undefined)
      throw new Error('Invalid gross debt');
    if (patrimony === null || patrimony === undefined)
      throw new Error('Invalid patrimony');

    for (let i = 0; i < lastDividendsYield.length; i++) {
      if (lastDividendsYield[i] < 0) continue;
      if (lastDividendsYield[i] >= 1)
        lastDividendsYield[i] = lastDividendsYield[i] / 100;
    }
  }

  public constistentDividend() {
    const { lastDividendsYield } = this;
    let consistent = true;
    for (const dividend of lastDividendsYield) {
      if (dividend < 0.06) consistent = false;
    }
    return consistent;
  }

  public crescentDividend() {
    const { lastDividendsValue } = this;
    let crescent = true;
    for (let i = 0; i < lastDividendsValue.length; i++) {
      if (lastDividendsValue[i + 1] === undefined) break;
      if (!(lastDividendsValue[i] < lastDividendsValue[i + 1]))
        crescent = false;
    }
    return crescent;
  }

  private makePoints(): Pontuation {
    const { dividendYieldMedian } = this;
    const { grossDebt, patrimony, actualDividendYield, payout, actualPrice } =
      this.stock;

    const conditions: Record<string, boolean> = {};

    const maxPrice =
      (this.dividendYieldAverage * this.stock.actualPrice) / 0.06;

    conditions['Média do Dividend Yield nos últimos 5 anos > 0.05 (5%)'] =
      this.dividendYieldAverage >= 0.05;
    conditions['Mediana do Dividend Yield nos últimos 5 anos > 0.05 (5%)'] =
      dividendYieldMedian >= 0.06;
    conditions['Dividend Yield Atual > 0.06 (6%)'] =
      actualDividendYield >= 0.06;
    conditions['Dívida Bruta/Patrimônio < 0.5 (50%)'] =
      grossDebt / patrimony <= 0.5;
    conditions['Pagamento constante de dividendos nos últimos 5 anos'] =
      this.constistentDividend();
    conditions['Dividendos crescentes nos últimos 5 anos'] =
      this.crescentDividend();
    conditions['0 < Payout < 1'] = payout > 0 && payout < 1;
    conditions['Preço Atual < Preço Máximo'] = actualPrice < maxPrice;

    for (const condition in conditions) {
      if (conditions.hasOwnProperty(condition)) {
        if (conditions[condition]) this.points++;
      }
    }

    const points: Pontuation = {};
    for (const condition in conditions) {
      points[condition] = conditions[condition];
    }

    points['Pontuacao'] = this.points;
    return points;
  }
}
