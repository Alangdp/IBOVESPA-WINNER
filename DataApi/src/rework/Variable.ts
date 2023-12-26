import TickerFetcher from '../utils/getFuncions.js';

interface StockRequirements {
  ticker: string;
  name: string;
  activeValue: number;
  actualPrice: number;
  history: History[];
  shareQuantity: number;

  dividendYield: number;
  grossDebt: number;
  patrimony: number;
  lastDividendsYield: number[];
  payout: number;
  actualDividendYield: number;
  lastDividendsValue: number[];
}

interface Dividend {
  type: string;
  dataEx: string; // Use o tipo de dados correto para datas, se possível
  dataCom: string; // Use o tipo de dados correto para datas, se possível
  value: number; // Ou o tipo de dados apropriado para o valor
}

interface Dividends {
  lastDividends: Dividend[][];
  dividiendPorcentInDecimal: number;
  dividendPorcent: number;
}

interface History {
  [date: string]: {
    date: string;
    price: number;
  };
}

interface priceReturn {
  price: number;
  priceVariation: History[];
  currency: string;
}

export abstract class Variable {
  private _marketValue: number;

  abstract calculateRentability(): number;

  constructor(
    private _ticker: string,
    private _name: string,
    private _activeValue: number,
    private _shareQuantity: number,
    private _actualPrice: number,
    private _history: History[]
  ) {
    this._ticker = _ticker;
    this._name = _name;
    this._history = _history;
    this._actualPrice = _actualPrice;
    this._marketValue = _actualPrice * _activeValue;
  }

  get ticker() {
    return this._ticker;
  }

  get name() {
    return this._name;
  }

  get activeValue() {
    return this._activeValue;
  }

  get actualPrice() {
    return this._actualPrice;
  }

  get marketValue() {
    return this._marketValue;
  }

  set ticker(ticker: string) {
    this._ticker = ticker;
  }

  set name(name: string) {
    this._name = name;
  }

  set activeValue(_activeValue: number) {
    this._activeValue = _activeValue;
  }

  set actualPrice(actualPrice: number) {
    this._actualPrice = actualPrice;
  }
}

export class Stock extends Variable {
  _lastDividendsAverage?: number;
  _dividendYield: number;
  _grossDebt: number;
  _patrimony: number;
  _lastDividendsYield: number[];
  _lastDividendsValue: number[];
  _payout: number;
  _actualDividendYield: number;

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

    this._dividendYield = stock.dividendYield;
    this._grossDebt = stock.grossDebt;
    this._patrimony = stock.patrimony;
    this._payout = stock.payout;
    this._actualDividendYield = actualDividendYield;
    this._lastDividendsYield = stock.lastDividendsYield;
    this._lastDividendsValue = stock.lastDividendsValue;
  }

  calculateRentability() {
    return 0;
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

  get lastDividendsYield() {
    return this._lastDividendsYield;
  }

  get payout() {
    return this._payout;
  }

  get lastDividendsAverage() {
    return this._lastDividendsAverage;
  }

  get lastDividendsValue() {
    return this._lastDividendsValue;
  }
}

export class BazinMethod {
  private actualDividends: number;
  private points = 0;
  private maxPrice?: number;
  private dividendYieldMedian: number;
  private dividendYieldAverage: number;

  constructor(private stock: Stock) {
    const { dividendYield, actualPrice } = this.stock;
    if (!dividendYield) throw new Error('Invalid dividend yield');

    this.validate();
    this.dividendYieldAverage = this.makeDividendYieldAverage();
    this.dividendYieldMedian = this.makeDividendMedian();
    this.actualDividends = actualPrice * dividendYield;
    this.maxPrice = (this.dividendYieldMedian * stock.actualPrice) / 0.06;
    this.calculatePoints();

    console.log(this.points);
  }

  private validate() {
    const { lastDividendsYield, grossDebt, patrimony } = this.stock;

    if (grossDebt === null || grossDebt === undefined)
      throw new Error('Invalid gross debt');
    if (patrimony === null || patrimony === undefined)
      throw new Error('Invalid patrimony');

    if (!lastDividendsYield) throw new Error('Invalid dividends');

    for (let i = 0; i < lastDividendsYield.length; i++) {
      if (lastDividendsYield[i] < 0) continue;
      if (lastDividendsYield[i] >= 1)
        lastDividendsYield[i] = lastDividendsYield[i] / 100;
    }
  }

  public makeDividendYieldAverage() {
    const { lastDividendsYield } = this.stock;
    if (!lastDividendsYield) throw new Error('Invalid dividends');
    return (
      lastDividendsYield.reduce((acc, curr) => acc + curr, 0) /
      lastDividendsYield.length
    );
  }

  public makeDividendMedian() {
    const { lastDividendsYield } = this.stock;
    if (!lastDividendsYield) throw new Error('Invalid dividends');
    const sortedDividends = lastDividendsYield.sort();
    const middleIndex = sortedDividends.length / 2;

    if (sortedDividends.length % 2 === 0) {
      return (
        (sortedDividends[middleIndex] + sortedDividends[middleIndex - 1]) / 2
      );
    }

    return sortedDividends[Math.floor(middleIndex)];
  }

  public constistentDividend() {
    const { lastDividendsYield } = this.stock;
    if (!lastDividendsYield) throw new Error('Invalid dividends');
    let consistent = true;
    for (const dividend of lastDividendsYield) {
      if (dividend < 0.06) consistent = false;
    }
    return consistent;
  }

  public crescentDividend() {
    const { lastDividendsValue } = this.stock;
    if (!lastDividendsValue) throw new Error('Invalid dividends');
    let crescent = true;
    for (let i = 0; i < lastDividendsValue.length; i++) {
      if (lastDividendsValue[i + 1] === undefined) break;
      if (!(lastDividendsValue[i] < lastDividendsValue[i + 1]))
        crescent = false;
    }
    return crescent;
  }

  private calculatePoints() {
    const { dividendYieldMedian } = this;
    const { grossDebt, patrimony, actualDividendYield, payout } = this.stock;

    const conditions: Record<string, boolean> = {};

    // Media e Mediana e Atual
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

    for (const condition in conditions) {
      if (conditions[condition]) {
        this.points += 1;
        console.log(`${condition} atendida`);
      } else {
        console.log(`${condition} não atendida`);
      }
    }

    // Imprimir pontos
    console.log(`Pontuação total: ${this.points}`);
  }
}

async function instanceStock(ticker: string): Promise<Stock> {
  const tickerFetcher = new TickerFetcher(ticker);
  await tickerFetcher.initialize();

  const basicInfo = await tickerFetcher.getBasicInfo();
  const priceHistory = await tickerFetcher.getPrice();
  const dividendInfo = await tickerFetcher.getDividendInfo();
  const payout = await tickerFetcher.getPayout();
  const indicators = await tickerFetcher.getIndicatorsInfo();
  const lastDividendsYield: number[] = [];
  const lastDividendsValue: number[] = [];

  for (const dividend of indicators.dy.olds) {
    if (lastDividendsYield.length === 5) break;
    const dyValue = Number(dividend.value);
    lastDividendsYield.push(dyValue);
  }

  for (const dividend of dividendInfo.lastDividends) {
    if (lastDividendsValue.length === 5) break;
    const dyValue = Number(dividend.value);
    lastDividendsValue.push(dyValue);
  }

  if (!priceHistory) throw new Error('Error getting price history');
  if (!payout) throw new Error('Error getting payout');

  const stockData: StockRequirements = {
    shareQuantity: basicInfo.shareQuantity,
    ticker: tickerFetcher.getTicker(),
    name: basicInfo.name,
    activeValue: basicInfo.VPA * basicInfo.shareQuantity,
    actualPrice: basicInfo.price,
    history: priceHistory.priceVariation,
    dividendYield: basicInfo.dividendPorcent,
    grossDebt: basicInfo.grossDebt,
    patrimony: basicInfo.liquidPatrimony,
    lastDividendsYield: lastDividendsYield,
    lastDividendsValue: lastDividendsValue,
    payout: payout.actual / 100,
    actualDividendYield: dividendInfo.dividendPorcent,
  };

  const stock = new Stock(stockData);

  const bazin = new BazinMethod(stock);

  return stock;
}

instanceStock('BBAS3');

// async function name() {
//   const tickerFetcher = new TickerFetcher('BBAS3');
//   await tickerFetcher.initialize();

//   await tickerFetcher.getIndicatorsInfo();
// }

// name();
