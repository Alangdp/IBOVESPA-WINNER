import { StockProtocol } from '../interfaces/StockProtocol.type';
import { Pontuation } from '../types/Pontuation.type';

// TODO - REFAZER TUDO

export class BazinMethod {
  private actualDividends: number;
  private points = 0;
  private maxPrice?: number;
  private dividendYieldMedian: number;
  private dividendYieldAverage: number;
  private lastDividendYieldBrute: number[];

  private lastDividendsValue: number[] = [];
  private lastDividendsYield: number[] = [];

  constructor(private stock: StockProtocol) {
    const {
      dividendYield,
      actualPrice,
      lastDividendsYieldYear,
      lastDividendsValueYear,
      activeValue,
    } = this.stock;
    this.lastDividendsValue = lastDividendsValueYear.splice(0, 5);
    this.lastDividendsYield = lastDividendsYieldYear.splice(0, 5);
    this.lastDividendYieldBrute = lastDividendsYieldYear.splice(0, 5);
    this.lastDividendYieldBrute.shift();

    this.dividendYieldAverage = this.stock.makeAverage(this.lastDividendsYield);
    this.dividendYieldMedian = this.stock.makeMedian(this.lastDividendsYield);

    this.actualDividends = actualPrice * dividendYield;
    this.maxPrice = (this.dividendYieldAverage * stock.actualPrice) / 0.06;
    this.validate();
  }

  private validate() {
    const { grossDebt, patrimony } = this.stock;

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
    // console.log(this.lastDividendYieldBrute, 'PADRAO DO LOOP');
    // 2020 / 2023 / 2024 / 2022 / 2021

    // console.log(this.lastDividendsYield, 'DEPOIS DO REVERSE');

    let crescent = true;
    for (let i = 0; i < lastDividendYieldBrute.length; i++) {
      if (lastDividendYieldBrute[i + 1] === undefined) break;
      if (!(lastDividendYieldBrute[i] < lastDividendYieldBrute[i + 1]))
        crescent = false;
    }
    return crescent;
  }

  public makePoints(): Pontuation {
    const { dividendYieldMedian } = this;
    const { grossDebt, patrimony, actualDividendYield, payout, actualPrice } =
      this.stock;

    const conditions: Record<string, boolean> = {};

    const maxPrice =
      (this.dividendYieldAverage * this.stock.actualPrice) / 0.06;

    conditions['Média do Dividend Yield nos últimos 5 anos > 0.06 (5%)'] =
      this.dividendYieldAverage >= 0.06;
    conditions['Mediana do Dividend Yield nos últimos 5 anos > 0.06 (5%)'] =
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
