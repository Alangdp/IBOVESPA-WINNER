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

  getTransactionsOnDate(date: string): Transaction[] {
    return this.transactions.filter((transaction) => {
      if (transaction.transaction_date === date)
        return transaction.transaction_date;
    });
  }

  getStocksPriceOnDate(date: string): StockPrice {
    const stockPrice = this._indexHistoryPrice[date];
    const result: StockPrice = {};

    Object.entries(stockPrice).forEach(([ticker, { price }]) => {
      result[ticker] = { price, ticker };
    });

    return result;
  }

  createTickerOnChart(chart: Chart, ticker: string) {
    const tempChart = (chart.individualRentability[ticker] = {
      medianPrice: 0,
      rentability: 0,
      quantity: 0,
      valueTotal: 0,
      valueInvested: 0,
    });
    return tempChart;
  }

  makeEmptyChart(): Chart {
    return {
      globalRentabily: 0,
      globalStockQuantity: 0,
      globalStockValue: 0,
      globalDividendValue: 0,
      globalTotalValue: 0,
      individualRentability: {},
    };
  }

  constructHistory() {
    const dates = Object.keys(this._indexHistoryPrice);

    let previousDate = null;

    for (const date of dates) {
      const previousChart = previousDate
        ? this.historyData[previousDate].chart
        : null;

      const dividendsPaymentOnDate = this.getDividendsOnDate(date);
      const transactionsOnDate = this.getTransactionsOnDate(date);
      const stocksPrice = this.getStocksPriceOnDate(date);

      this.historyData[date] = {
        date: date,
        prices: stocksPrice,
        dividends: dividendsPaymentOnDate,
        transactions: transactionsOnDate,
        chart: this.makeEmptyChart(),
      };

      const requirements: chartUpdateInfo = {
        date: date,
        stocksPrice: stocksPrice,
        dividendsPaymentOnDate: dividendsPaymentOnDate,
        previousDate: previousDate,
      };

      this.historyData[date].chart = this.updateChart(requirements);

      previousDate = date;
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

  firstIteration(
    requirements: chartUpdateInfo,
    chart: Chart,
    previousChart: Chart | undefined
  ): Chart {
    const { date } = requirements;
    const transactions = this.historyData[date].transactions;
    const dividends = this.historyData[date].dividends;
    const prices = this.historyData[date].prices;

    if (transactions.length > 0) {
      for (const transaction of transactions) {
        const ticker = transaction.ticker;
        const quantity = transaction.quantity;
        const price = prices[ticker].price;
        const value = quantity * price;
        const priceOnDate = prices[ticker].price;
        let individualChart = chart.individualRentability[ticker];

        if (individualChart === undefined) {
          individualChart = chart.individualRentability[ticker] =
            this.createTickerOnChart(chart, ticker);
        }

        // PREVIOUSCHART DOESN'T EXIST
        if (transaction.type === 'BUY' && !previousChart) {
          individualChart.quantity += quantity;
          individualChart.valueInvested += quantity * price;
          individualChart.valueTotal += quantity * priceOnDate;
          individualChart.medianPrice =
            individualChart.valueInvested / individualChart.quantity;

          individualChart.rentability =
            (individualChart.quantity * priceOnDate) /
            (individualChart.quantity * individualChart.medianPrice);

          chart.individualRentability[ticker] = individualChart;
        }

        // PREVIOUSCHART EXIST
        else if (transaction.type === 'BUY' && previousChart) {
          const { quantity: oldQuantity } = individualChart;
          individualChart.quantity += oldQuantity + quantity;
          individualChart.valueInvested += individualChart.quantity * price;
          individualChart.valueTotal += oldQuantity * priceOnDate;
          individualChart.medianPrice =
            individualChart.valueInvested / individualChart.quantity;

          individualChart.rentability =
            (individualChart.quantity * priceOnDate) /
            (individualChart.quantity * individualChart.medianPrice);

          chart.individualRentability[ticker] = individualChart;
        }
      }
    }

    return chart;
  }

  updateChart(requirements: chartUpdateInfo): Chart {
    if (!requirements.previousDate)
      return this.firstIteration(
        requirements,
        this.makeEmptyChart(),
        undefined
      );

    const { date, previousDate } = requirements;
    const previousChart = this.historyData[previousDate].chart ?? null;
    const transactions = this.historyData[date].transactions;
    const dividends = this.historyData[date].dividends;
    const prices = this.historyData[date].prices;

    console.log(previousDate, 'PREVIOUS DATE');
    console.log(this.historyData[previousDate].chart, 'PREVIOUS CHART');

    const chart: Chart = {
      globalRentabily: 0,
      globalStockQuantity: 0,
      globalStockValue: 0,
      globalDividendValue: 0,
      globalTotalValue: 0,
      individualRentability: { ...previousChart?.individualRentability },
    };

    if (!previousChart)
      return this.firstIteration(
        requirements,
        this.makeEmptyChart(),
        undefined
      );

    console.log(transactions.length, 'TRANSACTIONS LENGTH');
    console.log(transactions, 'TRANSACTIONS');

    if (transactions.length > 0) {
      for (const transaction of transactions) {
        if (transaction.type === 'BUY') {
          const ticker = transaction.ticker;
          if (!chart.individualRentability[ticker])
            return this.firstIteration(requirements, chart, previousChart);
          const quantity = transaction.quantity;
          const price = prices[ticker].price;
          const value = quantity * price;

          const priceOnDate = prices[ticker].price;

          const individualChart = chart.individualRentability[ticker];

          let previusIndividualChart =
            previousChart.individualRentability[ticker];

          const oldQuantity = previusIndividualChart.quantity;
          const oldPrice = previusIndividualChart.medianPrice;
          const oldTotalValue = previusIndividualChart.valueTotal;
          const oldInvestedValue = previusIndividualChart.valueInvested;

          individualChart.quantity += oldQuantity + quantity;
          individualChart.valueInvested += oldInvestedValue + quantity * price;
          individualChart.valueTotal += individualChart.quantity * priceOnDate;

          chart.individualRentability[ticker] = individualChart;
        }
      }
    }

    return previousChart;
  }

  get indexHistoryPrice() {
    return this._indexHistoryPrice;
  }

  get indexDividend() {
    return this._indexDividend;
  }
}

History.instanceHistory(transactions);
