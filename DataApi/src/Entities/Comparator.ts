// import { ComparatorProps, ArrayWithKeyValue } from '../types/Comparator.type.js';
// import { StockDataBase } from '../useCases/StockDataBase.js';
// import Utilities from '../utils/Utilities.js';

// ! DISCONTINUED NOT WORKING
// const teste: ComparatorProps = {
//   arrayToCompare: [
//     {
//       ticker: 'exampleTicker',
//       indicators: {}
//     },

//     {
//       ticker: 'exampleTicker',
//       indicators: {}
//     }
//   ]
// }

// export class Comparator {

//   static async makeData(tickers: string[]) {
//     const {} = await StockDataBase.startDatabase();
//     const toCompare: ComparatorProps = {
//       arrayToCompare: []
//     }

//     for(const ticker of tickers) {
//       const stock = await StockDataBase.getStock(ticker);
//       toCompare.arrayToCompare.push({
//         ticker: stock.ticker,
//         indicators: stock.indicators
//       })
//     }

//     return toCompare.arrayToCompare;
//   }

//   static async execute(tickers: string[]) {
//     const arrayToCompare = await Comparator.makeData(tickers);
//     const valuesOrdered: ArrayWithKeyValue = {}
//     const biggerValues: ArrayWithKeyValue = {}

//     for(const item of arrayToCompare) {
//       if(!valuesOrdered['ticker']) valuesOrdered['ticker'] = [item.ticker]
//       else valuesOrdered['ticker'].push(item.ticker)
//     }

//     for(const item of arrayToCompare) {
//       const { indicators } = item
//       const keys = Object.keys(indicators);
//       for(const key of keys) {
//         if(!valuesOrdered[key]) valuesOrdered[key] = [ indicators[key].actual ?? 0];
//         else valuesOrdered[key].push(indicators[key].actual)
//       }
//     }

//     for(const item of arrayToCompare) {
//       const { indicators } = item
//       const keys = Object.keys(indicators);
//       for(const key of keys) {
//         if(key === 'ticker') continue;
//         const biggerIndex = Utilities.findIndexOfGreatest(valuesOrdered[key] as number[]) 
//         biggerValues[key] = [biggerIndex]
//       }
//     }

//     return { keys: Object.keys(arrayToCompare[0].indicators), valuesOrdered, biggerValues}
//   }
// }