import { MacroInfo } from '../global/MacroInfo.js';
import { PriceHistory } from '../types/stock.types.js';

export abstract class Variable {
  public marketValue: number;
  public CDI: number = MacroInfo.CDI;
  public IPCA: number = MacroInfo.IPCA;

  abstract calculateRentability(
    actualPrice: number,
    referencePrice: number
  ): number;

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

  public makeMedian(array: number[]) {
    const sortedArray = array.sort();
    const middleIndex = sortedArray.length / 2;

    if (sortedArray.length % 2 === 0) {
      return (sortedArray[middleIndex] + sortedArray[middleIndex - 1]) / 2;
    }

    return sortedArray[Math.floor(middleIndex)];
  }

  public makeAverage(array: number[]) {
    return array.reduce((acc, curr) => acc + curr, 0) / array.length;
  }
}
