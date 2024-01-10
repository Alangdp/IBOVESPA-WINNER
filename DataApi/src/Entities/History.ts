import { LastDividendPayment, Dividend } from '../types/dividends.type';
import { PriceHistory } from '../types/stock.types';
import { transactions, Transaction } from './Transaction.js';
import { Stock } from './Stock.js';
import instanceStock from './instance.js';
import {
  HistoryUtils,
  IndexDividend,
  IndexHistoryPrice,
} from '../utils/HistoryUtils.js';

import Utilities from '../utils/Utilities.js';
import {
  DividendOnDate,
  HistoryData,
  HistoryRequirements,
  StockInfo,
  StockPrice,
  Chart,
  chartUpdateInfo,
} from '../utils/History.type';
class History {
  stockInfo: StockInfo;
  transactions: Transaction[];
  historyData: HistoryData;
  chart: Chart = {
    passaram: [],
    globalRentabily: 0,
    globalStockQuantity: 0,
    globalStockValue: 0,
    globalDividendValue: 0,
    globalTotalValue: 0,
    individualRentability: {},
  };

  _indexHistoryPrice: IndexHistoryPrice;
  _indexDividend: IndexDividend;

  constructor(
    private requirements: HistoryRequirements,
    private uniqueTickers: string[]
  ) {
    this.stockInfo = requirements.stockInfo;
    this.transactions = requirements.transactions;
    this.historyData = {};

    let indexHistoryPrice: IndexHistoryPrice = {};
    for (const ticker of this.uniqueTickers) {
      indexHistoryPrice = HistoryUtils.indexHistoryPrice(
        this.stockInfo[ticker].historyPrice,
        ticker,
        indexHistoryPrice
      );
    }

    let indexDividend: IndexDividend = {};
    for (const ticker of this.uniqueTickers) {
      console.log(this.stockInfo[ticker].dividend);
      indexDividend = HistoryUtils.indexDividend(
        this.stockInfo[ticker].dividend,
        indexDividend
      );
    }

    this._indexHistoryPrice = indexHistoryPrice;
    this._indexDividend = indexDividend;

    this.constructHistory();
  }
  /**
   *
   * @param date format: DD-MM-YYYY
   * @returns DividendOnDate
   */

  getDividendsOnDate(date: string): DividendOnDate {
    let dividendsPaymentOnDate: DividendOnDate = {};
    if (this._indexDividend[date]) {
      const dividends = this._indexDividend[date];

      Object.keys(dividends).map((ticker) => {
        const dividend: Dividend = {
          date: '',
          ticker: '',
          value: 0,
          type: '',
        };

        dividend.date = date;
        dividend.ticker = ticker;
        dividend.value = dividends[ticker].value;
        dividend.type = dividends[ticker].type;

        dividendsPaymentOnDate[ticker] = dividend;
      });
    }
    return dividendsPaymentOnDate;
  }

  /**
   * @param date format: DD-MM-YYYY
   * @returns Transaction[]
   */
  getTransactionsOnDate(date: string): Transaction[] {
    return this.transactions.filter((transaction) => {
      if (transaction.transaction_date === date)
        return transaction.transaction_date;
    });
  }

  /**
   *
   * @param date format: DD-MM-YYYY
   * @returns StockPrice[]
   */
  getStocksPriceOnDate(date: string): StockPrice {
    const stockPrice = this._indexHistoryPrice[date];

    const result: StockPrice = {};

    Object.keys(stockPrice).forEach((ticker) => {
      result[ticker] = {
        price: stockPrice[ticker].price,
        ticker: ticker,
      };
    });

    return result;
  }

  createTickerOnChart(ticker: string) {
    this.chart.individualRentability[ticker] = {
      medianPrice: 0,
      rentability: 0,
      quantity: 0,
      valueTotal: 0,
      valueInvested: 0,
    };
  }

  updateChart(requirements: chartUpdateInfo) {
    const { transaction, date, stocksPrice, dividendsPaymentOnDate } =
      requirements;

    const ticker = transaction.ticker;
    if (transaction.type === 'BUY') {
      const stock = this.stockInfo[transaction.ticker].stock;

      // INFO STOCK

      const priceOnDate = stocksPrice[ticker].price;

      // INFO TRANSACTION

      const quantity = transaction.quantity;
      const price = transaction.price;

      // INFO CHART

      const selectedTicker = this.chart.individualRentability[ticker];

      const medianPrice = selectedTicker.medianPrice;
      const rentability = selectedTicker.rentability;
      const quantityOnChart = selectedTicker.quantity;
      const valueTotal = selectedTicker.valueTotal;
      const valueInvested = selectedTicker.valueInvested;

      // CALCULATIONS

      const newQuantity = quantityOnChart + quantity;
      const newValueTotal = newQuantity * priceOnDate;
      const newValueInvested = valueInvested + quantity * price;
      const newMedianPrice = newValueInvested / newQuantity;
      const newRentability =
        ((priceOnDate - newMedianPrice) / newMedianPrice) * 100;

      // UPDATE CHART

      this.chart.individualRentability[ticker] = {
        medianPrice: newMedianPrice,
        rentability: newRentability,
        quantity: newQuantity,
        valueTotal: newValueTotal,
        valueInvested: newValueInvested,
      };
    }
  }

  createOrUpdateChart(requirements: chartUpdateInfo) {
    const { transaction, date, stocksPrice, dividendsPaymentOnDate } =
      requirements;

    const ticker = transaction.ticker;
    if (!this.chart.individualRentability[ticker])
      this.createTickerOnChart(ticker);

    if (transaction.type === 'BUY') {
      this.updateChart(requirements);
    }
  }

  constructHistory() {
    const dates = Object.keys(this._indexHistoryPrice);

    let atualizoesNaCarteira = 0;

    for (const date of dates) {
      const dividendsPaymentOnDate = this.getDividendsOnDate(date);
      const transactionsOnDate = this.getTransactionsOnDate(date);
      const stocksPrice = this.getStocksPriceOnDate(date);

      if (transactionsOnDate.length !== 0) {
        for (const transactionDate of transactionsOnDate) {
          this.chart.passaram.push(transactionDate.ticker);
          this.createOrUpdateChart({
            transaction: transactionDate,
            date: date,
            stocksPrice: stocksPrice,
            dividendsPaymentOnDate: dividendsPaymentOnDate,
          });

          atualizoesNaCarteira++;

          console.log(this.uniqueTickers, 'UNIQUE TICKERS');
          console.log(this.chart, 'CHART');
          console.log(atualizoesNaCarteira, 'ATUALIZACOES');
        }
      }

      this.historyData[date] = {
        date: date,
        prices: stocksPrice,
        dividends: dividendsPaymentOnDate,
        transactions: [...transactionsOnDate],
        chart: this.chart,
      };
    }

    Utilities.saveJSONToFile(this.historyData, 'history.json');
  }

  static async instanceHistory(transactions: Transaction[]) {
    const uniqueTickers = Array.from(
      new Set(transactions.map((transaction) => transaction.ticker))
    );

    const stockInfo: StockInfo = {};
    for (const ticker of uniqueTickers) {
      const dividends: Dividend[] = [];
      const stock = await instanceStock(ticker);
      for (const dividend of stock.lastDividendsValue) {
        dividends.push(HistoryUtils.convertLastDividendToDividend(dividend));
      }

      stockInfo[ticker] = {
        stock: stock,
        dividend: dividends,
        historyPrice: stock.priceHistory,
      };
    }

    const requirements: HistoryRequirements = {
      stockInfo: stockInfo,
      transactions: transactions,
    };

    return new History(requirements, uniqueTickers);
  }

  get indexHistoryPrice() {
    return this._indexHistoryPrice;
  }

  get indexDividend() {
    return this._indexDividend;
  }
}

History.instanceHistory(transactions);
