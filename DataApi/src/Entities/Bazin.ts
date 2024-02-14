import {
  BazinMethods,
  BazinProtocol,
} from '../interfaces/BazinProtocol.type.js';
import { StockProtocol } from '../interfaces/StockProtocol.type';
import { Pontuation } from '../types/Pontuation.type';

// TODO - REFAZER TUDO

export class Bazin extends BazinProtocol implements BazinMethods {
  constructor(stock: StockProtocol) {
    super();
    const {
      dividendYield,
      actualPrice,
      lastDividendsYieldYear,
      lastDividendsValueYear,
      activeValue,
    } = stock;
    this.lastDividendsValue = lastDividendsValueYear.splice(0, 5);
    this.lastDividendsYield = lastDividendsYieldYear.splice(0, 5);
    this.lastDividendYieldBrute = lastDividendsYieldYear.splice(0, 5);
    this.lastDividendYieldBrute.shift();

    this.dividendYieldAverage = stock.makeAverage(this.lastDividendsYield);
    this.dividendYieldMedian = stock.makeMedian(this.lastDividendsYield);

    this.actualDividends = actualPrice * dividendYield;
    this.maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;
    this.validate(stock);
  }

  validate(stock: StockProtocol) {
    const { grossDebt, patrimony } = stock;

    if (grossDebt === null || grossDebt === undefined)
      throw new Error('Invalid gross debt');
    if (patrimony === null || patrimony === undefined)
      throw new Error('Invalid patrimony');

    // for (let i = 0; i < this.lastDividendsYield.length; i++) {
    //   if (this.lastDividendsYield[i] < 0) this.lastDividendsValue.slice(i, 1);
    // }
  }

  public constistentDividend() {
    const { lastDividendsYield } = this;
    let consistent = true;
    for (const dividend of lastDividendsYield) {
      if (dividend < 0.06) consistent = false;
    }
    return consistent;
  }

  // FIXME LOOP ESTA AO CONTRARIO
  public crescentDividend() {
    const { lastDividendYieldBrute } = this;
    const tolerance = 1;

    let previousDividend = Math.abs(lastDividendYieldBrute[0]);
    for (let i = 1; i < lastDividendYieldBrute.length; i++) {
      if (Math.abs(lastDividendYieldBrute[i]) < previousDividend - tolerance) {
        return false;
      }
      previousDividend = Math.abs(lastDividendYieldBrute[i]);
    }
    return true;
  }

  addPoints(validation: boolean, toAdd: number, toRemove: number) {
    if (validation) {
      this.points += toAdd;
      return validation;
    } else {
      this.points - +toRemove;
      return validation;
    }
  }

  public makePoints(stock: StockProtocol): Pontuation {
    const { dividendYieldMedian } = this;
    const { grossDebt, patrimony, actualDividendYield, payout, actualPrice } =
      stock;

    const conditions: Record<string, boolean> = {};

    const maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;

    conditions['Média do Dividend Yield nos últimos 5 anos > 0.06 (5%)'] =
      this.addPoints(this.dividendYieldAverage >= 0.06, 1, 2);
    conditions['Mediana do Dividend Yield nos últimos 5 anos > 0.06 (5%)'] =
      this.addPoints(dividendYieldMedian >= 0.06, 1, 2);
    conditions['Dividend Yield Atual > 0.06 (6%)'] = this.addPoints(
      actualDividendYield >= 0.06,
      1,
      2
    );
    conditions['Dívida Bruta/Patrimônio < 0.5 (50%)'] = this.addPoints(
      grossDebt / patrimony <= 0.5,
      1,
      2
    );
    conditions['Pagamento constante de dividendos nos últimos 5 anos'] =
      this.addPoints(this.constistentDividend(), 1, 1);
    conditions['Dividendos crescentes nos últimos 5 anos'] = this.addPoints(
      this.crescentDividend(),
      1,
      1
    );
    conditions['0 < Payout < 1'] = this.addPoints(
      payout > 0 && payout < 1,
      1,
      1
    );
    conditions['Preço Atual < Preço Máximo'] = this.addPoints(
      actualPrice < maxPrice,
      1,
      1
    );

    const points: Pontuation = {};
    for (const condition in conditions) {
      points[condition] = conditions[condition];
    }

    points['Pontuacao'] = this.points;
    return points;
  }
}
