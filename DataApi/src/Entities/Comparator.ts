import { StockProps } from '../types/stock.types';
import Utilities from '../utils/Utilities.js';
import instanceStock from './instanceStock.js';

interface ComparatorProps {
  arrayToCompare: StockProps[]
} 

type ArrayWithKeyValue = {
  [key: string]: Array<number | string>
}

class Comparator {

  static execute({ arrayToCompare }: ComparatorProps): { keys: string[], valuesOrdered: ArrayWithKeyValue, biggerValues: ArrayWithKeyValue } {
    const valuesOrdered: ArrayWithKeyValue = {}
    const biggerValues: ArrayWithKeyValue = {}

    for(const stock of arrayToCompare) {
      if(!valuesOrdered['ticker']) valuesOrdered['ticker'] = [stock.ticker]
      else valuesOrdered['ticker'].push(stock.ticker)
    }

    for(let i = 0; i < arrayToCompare.length; i++) {
      const stock = arrayToCompare[i]
      const { indicators: indicators } = stock
      const keys = Object.keys(indicators);
      for(const key of keys) {
        if(!valuesOrdered[key]) valuesOrdered[key] = [ indicators[key].actual ?? 0];
        else valuesOrdered[key].push(indicators[key].actual)
      }
    }

    for(let i = 0; i < arrayToCompare.length; i++) {
      const stock = arrayToCompare[i]
      const { indicators: indicators } = stock
      const keys = Object.keys(indicators);
      for(const key of keys) {
        if(key === 'ticker') continue;
        const biggerIndex = Utilities.findIndexOfGreatest(valuesOrdered[key] as number[]) 
        biggerValues[key] = [biggerIndex]
      }
    }

    return { keys: Object.keys(arrayToCompare[0].indicators), valuesOrdered, biggerValues}
  }
}
