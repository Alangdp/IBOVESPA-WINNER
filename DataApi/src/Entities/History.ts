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

  getStocksPriceOnDate(date: string): StockPrice[] {
    const stockPrice = this._indexHistoryPrice[date];
    return Object.keys(stockPrice).map((ticker) => {
      const stock: StockPrice = {};
      stock[ticker] = {
        price: stockPrice[ticker].price,
        ticker: ticker,
      };

      return stock;
    });
  }

  constructHistory() {
    const dates = Object.keys(this._indexHistoryPrice);

    const chart: Chart = {
      globalRentabily: 0,
      globalStockQuantity: 0,
      globalStockValue: 0,
      globalDividendValue: 0,
      globalTotalValue: 0,
      individualRentability: {},
    };

    for (const date of dates) {
      const dividendsPaymentOnDate = this.getDividendsOnDate(date);
      const transactions = this.getTransactionsOnDate(date);
      const stocksPrice = this.getStocksPriceOnDate(date);

      console.log(transactions, 'TRANSACOES ANTES DO IF');
      if (transactions.length !== 0) {
        for (const transaction of transactions) {
          const { ticker, quantity } = transaction;
          const stock = this.stockInfo[ticker].stock;
          const stockPrice = stocksPrice.find((stock) => stock[ticker])!;
          const price = stockPrice[ticker].price;
          console.log(stockPrice[ticker].price, 'PRICEeeeeeeeeeeeeeee');

          if (transaction.type === 'BUY') {
            if (!chart.individualRentability[ticker]) {
              const medianPrice = price * quantity;
              chart.individualRentability[ticker] = {
                medianPrice: medianPrice,
                rentability: ((price - medianPrice) / medianPrice) * 100,
                quantity: quantity,
                value: quantity * price,
              };
            }

            if (chart.individualRentability[ticker]) {
              const medianPrice =
                (price * quantity) /
                  chart.individualRentability[ticker].quantity +
                quantity;
              chart.individualRentability[ticker] = {
                medianPrice: medianPrice,
                rentability: ((price - medianPrice) / medianPrice) * 100,
                quantity:
                  chart.individualRentability[ticker].quantity + quantity,
                value: quantity * price,
              };
            }
          }
        }
      }

      this.historyData[date] = {
        date: date,
        prices: stocksPrice,
        dividends: dividendsPaymentOnDate,
        transactions: [...transactions],
        chart: chart,
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
