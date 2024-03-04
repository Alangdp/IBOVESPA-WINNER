import {
  BazinMethods,
  BazinProtocol,
} from '../interfaces/BazinProtocol.type.js';
import { StockProtocol } from '../interfaces/StockProtocol.type';
import { PontuationRule } from '../types/Pontuation.type.js';
import { StockProps } from '../types/stock.types.js';
import MathUtils from '../utils/MathUtils.js';
import { Pontuation } from './Pontuation.js';
import { pontuationModel } from '../database/mongodb/models/Pontuation.model.js';

// TODO - REFAZER TUDO


export class Bazin extends BazinProtocol implements BazinMethods {
  constructor(stock: StockProps) {
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

    this.dividendYieldAverage = MathUtils.makeAverage(this.lastDividendsYield);
    this.dividendYieldMedian = MathUtils.makeMedian(this.lastDividendsYield);

    this.actualDividends = actualPrice * dividendYield;
    this.maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;
    this.validate(stock);
  }

  validate(stock: StockProps) {
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

  public async makePoints(stock: StockProps) {
    const { dividendYieldMedian } = this;
    const { grossDebt, patrimony, actualDividendYield, payout, actualPrice, ticker } =
      stock;

    const maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;

    const rules: PontuationRule[] = [
      { ifFalse: 1, ifTrue: 2, rule: this.dividendYieldAverage >= 0.06, ruleName: "Média do Dividend Yield nos últimos 5 anos > 0.06 (5%)" },
      { ifFalse: 1, ifTrue: 2, rule: dividendYieldMedian >= 0.06, ruleName: "Mediana do Dividend Yield nos últimos 5 anos > 0.06 (5%)" },
      { ifFalse: 1, ifTrue: 2, rule: actualDividendYield >= 0.06, ruleName: "Dividend Yield Atual > 0.06 (6%)" },
      { ifFalse: 1, ifTrue: 2, rule: grossDebt / patrimony <= 0.5, ruleName: "Dívida Bruta/Patrimônio < 0.5 (50%)" },
      { ifFalse: 1, ifTrue: 1, rule: this.constistentDividend(), ruleName: "Pagamento constante de dividendos nos últimos 5 anos" },
      { ifFalse: 1, ifTrue: 1, rule: this.crescentDividend(), ruleName: "Dividendos crescentes nos últimos 5 anos" },
      { ifFalse: 1, ifTrue: 1, rule: payout > 0 && payout < 1, ruleName: "0 < Payout < 1" },
      { ifFalse: 1, ifTrue: 1, rule: actualPrice < maxPrice, ruleName: "Preço Atual < Preço Máximo" }
    ];

    const pontuation = new Pontuation({
      defaultIfFalse: 1,
      defaultIfTrue: 1,
      id: ticker,
      subId: "BAZIN",
      totalPoints: 0
    })

    rules.forEach( rule => {
      pontuation.addRule(rule);
    })

    pontuation.calculate();

    const model = await pontuationModel;
    await model.create(pontuation);

    return pontuation
  }
}
