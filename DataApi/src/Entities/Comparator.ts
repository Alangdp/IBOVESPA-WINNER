import { ComparatorProps, ArrayWithKeyValue } from '../types/Comparator.type.js';
import Utilities from '../utils/Utilities.js';


class Comparator {

  static execute({ arrayToCompare }: ComparatorProps): { keys: string[], valuesOrdered: ArrayWithKeyValue, biggerValues: ArrayWithKeyValue } {
    const valuesOrdered: ArrayWithKeyValue = {}
    const biggerValues: ArrayWithKeyValue = {}

    for(const item of arrayToCompare) {
      if(!valuesOrdered['ticker']) valuesOrdered['ticker'] = [item.ticker]
      else valuesOrdered['ticker'].push(item.ticker)
    }

    for(const item of arrayToCompare) {
      const { indicators } = item
      const keys = Object.keys(indicators);
      for(const key of keys) {
        if(!valuesOrdered[key]) valuesOrdered[key] = [ indicators[key].actual ?? 0];
        else valuesOrdered[key].push(indicators[key].actual)
      }
    }

    for(const item of arrayToCompare) {
      const { indicators } = item
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