import instanceStock from './instance.js';

import { Dividend, DividendOnDate } from '../types/dividends.type';
import { IndexDividend, IndexHistoryPrice } from '../types/Index.type.js';
import { Chart } from '../types/Chart.type.js';
import { StockInfo } from '../types/stock.types.js';
import { chartUpdateInfo } from '../types/Chart.type.js';

import {
  HistoryData,
  HistoryRequirements,
  StockPrice,
} from '../types/History.type.js';

import HistoryUtils from '../utils/HistoryUtils.js';
import { transactions, Transaction } from './Transaction.js';
import Utilities from '../utils/Utilities.js';

// METAS:
// 1 - IMPLEMENTAR DIVIDENDOS - COMPLETO - COMPLETO
// 2 - ATUALIZAR DADOS SECUNDARIOS DO CHART - COMPLETO
// globalRentabily: number;
// globalStockQuantity: number;
// globalStockValue: number;
// globalDividendValue: number;
// globalTotalValue: number;
//
// TODO: SISTEMA DE THREADS(OTIMIZAÇÃO) - https://stackoverflow.com/questions/25167590/one-thread-for-many-tasks-vs-many-threads-for-each-task-do-sleeping-threads-aft

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
      indexDividend = HistoryUtils.indexDividend(
        this.stockInfo[ticker].dividend,
        indexDividend
      );
    }

    this._indexHistoryPrice = indexHistoryPrice;
    this._indexDividend = indexDividend;

    this.constructHistory();
  }

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
      dividendPayments: [],
      dividendValue: 0,
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

      this.historyData[date].chart = this.updateOrCreateChart(requirements);

      previousDate = date;
    }
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

  updateChart(requirements: chartUpdateInfo, chart: Chart): Chart {
    const { date } = requirements;
    const transactions = this.historyData[date].transactions;

    const prices = this.historyData[date].prices;

    if (transactions.length > 0) {
      for (const transaction of transactions) {
        const ticker = transaction.ticker;
        const quantity = transaction.quantity;
        const price = transaction.price;
        const valueInvested = quantity * price;
        const priceOnDate = prices[ticker].price;
        let individualChart = chart.individualRentability[ticker];

        if (!individualChart)
          individualChart = chart.individualRentability[ticker] =
            this.createTickerOnChart(chart, ticker);

        if (transaction.type === 'BUY') {
          individualChart.quantity += quantity;
          individualChart.valueInvested += valueInvested;

          individualChart.medianPrice =
            individualChart.valueInvested / individualChart.quantity;
          chart.individualRentability[ticker] = individualChart;
        }

        if (transaction.type === 'SELL') {
          const { quantity: oldQuantity } = individualChart;
          const newQuantity = oldQuantity - quantity;
          if (newQuantity <= 0) {
            delete chart.individualRentability[ticker];
            continue;
          }

          individualChart.valueInvested -= valueInvested;
          individualChart.quantity = newQuantity;

          chart.individualRentability[ticker] = individualChart;
        }
      }
    }

    for (const ticker of Object.keys(chart.individualRentability)) {
      if (!chart.individualRentability[ticker]) continue;
      const priceOnDate = prices[ticker].price;
      const individualChart = chart.individualRentability[ticker];

      individualChart.valueTotal = individualChart.quantity * priceOnDate;
      individualChart.rentability =
        (priceOnDate - individualChart.medianPrice) /
        individualChart.medianPrice;

      chart.individualRentability[ticker] = individualChart;

      chart.globalStockQuantity += individualChart.quantity;
      chart.globalStockValue += individualChart.valueTotal;
      chart.globalDividendValue += individualChart.dividendValue;
      chart.globalTotalValue += individualChart.valueTotal;
    }

    let pesoTotal = 0;
    let valorTotal = 0;

    for (const ticker of Object.keys(chart.individualRentability)) {
      const individualChart = chart.individualRentability[ticker];

      const peso = chart.globalTotalValue / individualChart.valueTotal;
      const valor = peso * individualChart.rentability;

      pesoTotal += peso;
      valorTotal += valor;
    }

    chart.globalRentabily = valorTotal * pesoTotal;

    return chart;
  }

  updateOrCreateChart(requirements: chartUpdateInfo): Chart {
    if (!requirements.previousDate)
      return this.updateChart(requirements, this.makeEmptyChart());

    const { date, previousDate } = requirements;
    const previousChart = this.historyData[previousDate].chart ?? undefined;

    const chart: Chart = {
      globalRentabily: 0,
      globalStockQuantity: 0,
      globalStockValue: 0,
      globalDividendValue: 0,
      globalTotalValue: 0,
      individualRentability: { ...previousChart?.individualRentability },
    };

    const chartUpdated = this.updateChart(requirements, chart);

    const chartUpdatedDividends = HistoryUtils.updateDividendOnChart(
      chartUpdated,
      requirements.dividendsPaymentOnDate,
      date
    );

    return chartUpdatedDividends;
  }

  get indexHistoryPrice() {
    return this._indexHistoryPrice;
  }

  get indexDividend() {
    return this._indexDividend;
  }
}

History.instanceHistory(transactions);
