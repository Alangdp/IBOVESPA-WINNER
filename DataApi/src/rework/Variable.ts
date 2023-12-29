import TickerFetcher from '../utils/getFuncions.js';
import { History } from './types/stock.types.js';
import { MacroInfo } from '../global/macroInfo.js';

export abstract class Variable {
  private _marketValue: number;
  private _CDI: number = MacroInfo.CDI;
  private _IPCA: number = MacroInfo.IPCA;

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

  get CDI() {
    return this._CDI;
  }

  get IPCA() {
    return this._IPCA;
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
