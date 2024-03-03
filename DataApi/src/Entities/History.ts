import { HistoryData, HistoryRequirements } from '../types/History.type.js';
import { IndexDividend, IndexHistoryPrice } from '../types/Index.type.js';
import { Dividend, DividendOnDate } from '../types/dividends.type.js';
import { StockInfo, StockPrice, StockProps } from '../types/stock.types.js';

import HistoryUtils from '../utils/History.Utils.js';
import Utilities from '../utils/Utilities.js';

import Json from '../utils/Json.js';
import Chart from './Chart.js';

import { ChartProtocol } from './../interfaces/ChartProtocol.type';
import BuyTransaction from './BuyTransaction.js';
import { TransactionHistory } from './Transaction.js';
import { StockDataBase } from '../useCases/stockDataBase.js';

// FIXME ARRUMAR SOLID AQUI

// METAS:
// 1 - IMPLEMENTAR DIVIDENDOS - COMPLETO - COMPLETO
// 2 - ATUALIZAR DADOS SECUNDARIOS DO CHART - COMPLETO
// globalRentabily: number;
// globalStockQuantity: number;
// globalStockValue: number;
// globalDividendValue: number;
// globalTotalValue: number;

// TODO: SISTEMA DE THREADS(OTIMIZAÇÃO) - https://stackoverflow.com/questions/25167590/one-thread-for-many-tasks-vs-many-threads-for-each-task-do-sleeping-threads-aft

class History {
  stockInfo: StockInfo;
  transactions: TransactionHistory[];
  historyData: HistoryData;
  chart: ChartProtocol = new Chart(null);

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

  getTransactionsOnDate(date: string): TransactionHistory[] {
    return this.transactions.filter((transaction) => {
      if (transaction.getTransactionDateString() === date)
        return transaction.getTransactionDateString();
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

      const chart = this.chart.updateChart(
        transactions,
        prices,
        dividends,
        date
      );

      this.historyData[date] = {
        date,
        prices,
        dividends,
        transactions,
        chart: chart,
      };

    }

    Json.saveJSONToFile(this.historyData, 'history.json');
  }

  static async instanceHistory(transactions: TransactionHistory[]) {
    const dividends: Dividend[] = [];
    const stockInfo: StockInfo = {};
    const allTickers = transactions.map((transaction) =>
      transaction.getTicker()
    );
    const uniqueTickers = Utilities.uniqueElements(allTickers);

    for (const ticker of uniqueTickers) {
      const stock = await StockDataBase.getStock(ticker);

      for (const dividend of stock.lastDividendsValue) {
        dividends.push(HistoryUtils.convertLastDividendToDividend(dividend));
      }

      stockInfo[ticker] = {
        stock: stock as StockProps,
        dividend: dividends,
        historyPrice: stock.priceHistory,
      };
    }

    return new History({ stockInfo, transactions }, uniqueTickers);
  }
}

const transactions: TransactionHistory[] = [
  BuyTransaction.create(
    {
      price: 10,
      quantity: 10,
      transactionDate: new Date('02/01/2024'),
      type: 'BUY',
      userId: 1,
    },
    { ticker: 'BBAS3' }
  ),
];

async function teste() {
  const history = await History.instanceHistory(transactions);
  console.log(history);
}

teste()
