import TickerFetcher from '../utils/Fetcher.js';
import { PriceHistory } from '../types/stock.types.js';
import { MacroInfo } from '../global/MacroInfo.js';

export abstract class Variable {
  public marketValue: number;
  public CDI: number = MacroInfo.CDI;
  public IPCA: number = MacroInfo.IPCA;
  public tickers: string[] = MacroInfo.tickers;

  abstract calculateRentability(): number;

  constructor(
    public ticker: string,
    public name: string,
    public activeValue: number,
    public shareQuantity: number,
    public actualPrice: number,
    public priceHistory: PriceHistory[]
  ) {
    this.ticker = ticker;
    this.name = name;
    this.priceHistory = priceHistory;
    this.actualPrice = actualPrice;
    this.marketValue = actualPrice * activeValue;
  }

  public makeMedian(array: any[]) {
    const sortedArray = array.sort();
    const middleIndex = sortedArray.length / 2;

    if (sortedArray.length % 2 === 0) {
      return (sortedArray[middleIndex] + sortedArray[middleIndex - 1]) / 2;
    }

    return sortedArray[Math.floor(middleIndex)];
  }

  public makeAverage(array: any[]) {
    return array.reduce((acc, curr) => acc + curr, 0) / array.length;
  }
}
