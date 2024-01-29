import instanceStock from './instance.js';

import { Dividend, DividendOnDate } from '../types/dividends.type.js';
import { IndexDividend, IndexHistoryPrice } from '../types/Index.type.js';
import { Chart } from '../types/Chart.type.js';
import { StockInfo, StockPrice } from '../types/stock.types.js';
import { chartUpdateInfo } from '../types/Chart.type.js';
import ChartTeste from './Chart.js';

import { HistoryData, HistoryRequirements } from '../types/History.type.js';

import HistoryUtils from '../utils/HistoryUtils.js';
import { transactions, Transaction } from './Transaction.js';
import Utilities from '../utils/Utilities.js';
import Database from '../utils/Stockdatabase.js';
import { Stock } from './Stock.js';
import Json from '../utils/Json.js';

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
  chart: ChartTeste = new ChartTeste(null);

  indexHistoryPrice: IndexHistoryPrice;
  indexDividend: IndexDividend;

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

    this.indexHistoryPrice = indexHistoryPrice;
    this.indexDividend = indexDividend;

    this.constructHistory();
  }

  getDividendsOnDate(date: string): DividendOnDate {
    let dividendsPaymentOnDate: DividendOnDate = {};
    if (this.indexDividend[date]) {
      const dividends = this.indexDividend[date];

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
    const stockPrice = this.indexHistoryPrice[date];
    const result: StockPrice = {};

    Object.entries(stockPrice).forEach(([ticker, { price }]) => {
      result[ticker] = { price, ticker };
    });

    return result;
  }

  constructHistory() {
    const dates = Object.keys(this.indexHistoryPrice);

    for (const date of dates) {
      const dividends = this.getDividendsOnDate(date);
      const transactions = this.getTransactionsOnDate(date);
      const prices = this.getStocksPriceOnDate(date);

      this.historyData[date] = {
        date,
        prices,
        dividends,
        transactions,
        chart: this.chart.updateChart(prices, transactions).returnChart(),
      };
    }
  }

  static async instanceHistory(transactions: Transaction[]) {
    const db = new Database<Stock>('json/stocks.json');
    const dividends: Dividend[] = [];
    const stockInfo: StockInfo = {};
    const uniqueTickers = Array.from(
      new Set(transactions.map((transaction) => transaction.ticker))
    );

    for (const ticker of uniqueTickers) {
      let stock = db.find((stock) => stock.ticker === ticker);
      const milliseconds = new Date().getTime() - (stock?.instaceTime ?? 0);

      if (stock && Utilities.msToHours(milliseconds) < 1) {
        for (const dividend of stock.lastDividendsValue) {
          dividends.push(HistoryUtils.convertLastDividendToDividend(dividend));
        }

        stockInfo[ticker] = {
          stock: stock,
          dividend: dividends,
          historyPrice: stock.priceHistory,
        };

        continue;
      }

      db.deleteBy((stock) => stock.ticker === ticker, true);

      stock = await instanceStock(ticker);
      stock.lastDividendsValue.forEach((dividend) =>
        dividends.push(HistoryUtils.convertLastDividendToDividend(dividend))
      );

      stockInfo[ticker] = {
        stock: stock,
        dividend: dividends,
        historyPrice: stock.priceHistory,
      };

      db.add(stock);
    }

    db.commit();

    return new History({ stockInfo, transactions }, uniqueTickers);
  }

  updateChart(requirements: chartUpdateInfo): Chart {
    const { date } = requirements;
    const transactions = this.historyData[date].transactions;
    const prices = this.historyData[date].prices;

    const ChartT = new ChartTeste(null);
    return ChartT.updateChart(prices, transactions);
  }
}

History.instanceHistory(transactions);
