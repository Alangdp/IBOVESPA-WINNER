// // IMPORTS
// import TickerFetcher from './getFuncions.js';
// import Utilities from './Utilities.js';
// import {
//   Transaction,
//   Stock,
//   History,
//   StockRentability,
//   chartDataType,
// } from '../types/get.js';

// const transationList: Transaction[] = [
//   {
//     ticker: 'TAEE11',
//     quantity: 100,
//     price: 14,
//     type: 'buy',
//     total_value: 1400,
//     broker_code: 1,
//     transaction_date: new Date('2018-11-15'),
//     user_id: 1,
//     stock_id: 1,
//     type_code: 0,
//   },
// ];

// interface TransactionsInfo {
//   stocks: Stock[];
//   uniqueTickers: string[];
// }

// export class HistoryClass {
//   private _transactions?: Transaction[];
//   private _user_id: number;
//   _transactionsInfo?: TransactionsInfo;
//   history?: History;

//   constructor(user_id: number, transactions: Transaction[]) {
//     this._transactions = transactions;
//     this._user_id = user_id;
//   }

//   public async initialize(transactions: Transaction[]) {
//     this._transactionsInfo = await this.getTransactionsInfo(transactions);
//   }

//   async getTransactionsInfo(
//     transactions: Transaction[]
//   ): Promise<TransactionsInfo> {
//     const tickersData: Stock[] = [];

//     const tickers = transactions?.map((transaction) => transaction.ticker);
//     const uniqueTickers = [...new Set(tickers)];

//     for (const ticker of uniqueTickers) {
//       const tickerFetcher = new TickerFetcher(ticker);
//       await tickerFetcher.initialize();

//       const basicInfo = await tickerFetcher.getBasicInfo();
//       const pricesInfo = await tickerFetcher.getPrice();

//       const stock: Stock = {
//         ticker: tickerFetcher.getTicker(),
//         company_name: basicInfo.name,
//         type: 'STOCK',
//         price: basicInfo.price,
//         image_url: basicInfo.image,
//         prices: pricesInfo?.priceVariation,
//       };

//       tickersData.push(stock);
//     }

//     return { stocks: tickersData, uniqueTickers };
//   }

//   public async makeBaseHistory() {
//     const uniqueTickers: string[] = this._transactionsInfo?.uniqueTickers || [];
//     const data: Stock[] = this._transactionsInfo?.stocks || [];
//     const history: History = {};

//     uniqueTickers.forEach((ticker: string) => {
//       history[ticker] = {};

//       data.forEach((stock: Stock) => {
//         if (stock.prices === undefined) return;

//         stock.prices.forEach((priceInfo) => {
//           const DateFormat = Utilities.formatStringtoDate(priceInfo.date);
//           const date = priceInfo.date;
//           const price = priceInfo.price;

//           history[ticker][date] = {
//             ticker: stock.ticker,
//             chartData: undefined,
//             date: DateFormat || undefined,
//             price,
//             transactionsPeriod: [],
//             dividend: undefined,
//           };
//         });
//       });
//     });

//     this.history = history;
//   }

//   public async makeRentability() {
//     const transactions = this._transactions || [];
//     const history = this.history || {};

//     transactions.forEach((transaction) => {
//       const { transaction_date, ticker, type_code, total_value } = transaction;
//       const atualDate = Utilities.formatDateToString(transaction_date);
//       const tickerHistory = history[ticker] || {};
//       const outside =
//         Utilities.findClosestDateKey(tickerHistory, atualDate) ||
//         Object.keys(tickerHistory)[0];

//       if (type_code === 0 || type_code === 1) {
//         const historyTickerOutside = history[ticker]?.[outside] || {};
//         const transactionsPeriod =
//           historyTickerOutside.transactionsPeriod || [];

//         transactionsPeriod.push(transaction);
//         history[ticker][outside] = {
//           ...historyTickerOutside,
//           transactionsPeriod,
//         };
//       }

//       if (type_code === 2) {
//         history[ticker][atualDate] = {
//           ...history[ticker][atualDate],
//           dividend: total_value,
//         };
//       }
//     });

//     this.history = history;
//   }

//   public makeRentabilityDaily() {
//     const chartData: chartDataType = {
//       stocks: [],
//       uniqueTickers: [],
//       totalValue: 0,
//     };
//     const history = this.history || {};

//     for (const ticker in history) {
//       for (const date in history[ticker]) {
//         const transactionsPeriod = history[ticker][date].transactionsPeriod;
//         if (
//           transactionsPeriod === undefined ||
//           transactionsPeriod?.length === 0
//         ) {
//           chartData.stocks.forEach((stock) => {
//             stock.totalValue =
//               history[stock.ticker][date].price * stock.quantity;
//             stock.medianPrice = stock.totalValue / stock.quantity;
//           });

//           history[ticker][date].chartData = chartData;
//           continue;
//         }

//         transactionsPeriod.forEach((transaction) => {
//           const ticker: string = transaction.ticker;
//           const transaction_date: Date = transaction.transaction_date;

//           console.log(
//             chartData.stocks.reduce((sum, stock) => sum + stock.quantity, 0)
//           );

//           console.log(transaction.total_value);
//           let stockRentability: StockRentability = {
//             ticker: transaction.ticker,
//             quantity: transaction.quantity,
//             price: transaction.price,
//             totalValue: 0,
//             medianPrice: 0,
//             date: Utilities.formatDateToString(transaction_date),
//             totalCust: transaction.total_value,
//           };

//           if (transaction.type_code === 0) {
//             if (!Utilities.existTickerInChart(chartData, ticker)) {
//               chartData.stocks.push(stockRentability);
//               chartData.uniqueTickers.push(ticker);
//             } else {
//               let index = Utilities.indexTickerInChart(chartData, ticker);
//               const chartInfo = chartData.stocks[index];

//               chartInfo.quantity += transaction.quantity;
//               chartInfo.totalCust += transaction.total_value;
//               chartInfo.totalValue =
//                 history[ticker][date].price * chartInfo.quantity;
//               chartInfo.medianPrice = chartInfo.totalCust / chartInfo.quantity;

//               chartData.stocks[index] = chartInfo;
//             }
//           }

//           if (transaction.type_code === 1) {
//             let index = Utilities.indexTickerInChart(chartData, ticker);
//             if (index === -1) return;

//             const chartInfo = chartData.stocks[index];

//             chartInfo.quantity -= transaction.quantity;
//             chartInfo.totalCust -= transaction.total_value;
//             chartInfo.totalValue =
//               history[ticker][date].price * chartInfo.quantity;
//             chartInfo.medianPrice = chartInfo.totalCust / chartInfo.quantity;

//             if (chartInfo.quantity === 0) {
//               chartData.stocks.splice(index, 1);
//               chartData.uniqueTickers.splice(index, 1);
//             }

//             chartData.stocks[index] = chartInfo;
//           }
//         });

//         chartData.totalValue = chartData.stocks.reduce(
//           (total, stock) => total + stock.totalValue,
//           0
//         );

//         history[ticker][date].chartData = {
//           stocks: [...chartData.stocks],
//           uniqueTickers: [...chartData.uniqueTickers],
//           totalValue: chartData.totalValue,
//         };

//         let index = Utilities.indexTickerInChart(chartData, ticker);
//         if (index !== -1) {
//           chartData.stocks[index].totalValue =
//             history[ticker][date].price * chartData.stocks[index].quantity;
//         }
//       }
//     }

//     this.history = history;
//   }

//   public calculateRentability() {
//     const history = this.history || {};

//     for (const ticker in history) {
//       for (const date in history[ticker]) {
//         const stocks = history[ticker][date].chartData?.stocks;
//         if (stocks === undefined) continue;

//         stocks.forEach((stock) => {
//           let quantity = stock.quantity;
//           let actualValue = stock.price;
//           let medianPrice = stock.medianPrice;

//           let rentability = actualValue / medianPrice - 1 * 100;
//           stock.rentability = {
//             totalRentability:
//               ((actualValue * quantity - stock.totalValue) /
//                 (actualValue * quantity)) *
//               100,
//             totalValue: quantity * medianPrice,
//             rentability: rentability - 1,
//           };
//         });
//       }
//     }

//     this.history = history;
//   }
// }

// async function teste() {
//   const history = new HistoryClass(1, transationList);
//   await history.initialize(transationList);

//   history.makeBaseHistory();
//   history.makeRentability();
//   history.makeRentabilityDaily();
//   history.calculateRentability();
//   Utilities.saveJSONToFile(history.history, 'history.json');
// }

// teste();
