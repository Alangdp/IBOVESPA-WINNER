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
} from '../utils/History.type';

type DividendPayment = LastDividendPayment;

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

  constructHistory() {
    const dates = Object.keys(this._indexHistoryPrice);

    for (const date of dates) {
      let dividendsPaymentOnDate: DividendOnDate = {};
      const stockPrice = this._indexHistoryPrice[date];
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
          dividend.value = dividends[ticker as keyof typeof dividends].value;
          dividend.type = dividends[ticker as keyof typeof dividends].type;

          dividendsPaymentOnDate[ticker] = dividend;
        });
      }

      const transactions = this.transactions.filter(
        (transaction) => transaction.transaction_date === date
      );

      const stocksPrice = Object.keys(stockPrice).map((ticker) => {
        const stock: StockPrice = {};
        stock[ticker] = {
          price: stockPrice[ticker].price,
        };

        return stock;
      });

      this.historyData[date] = {
        date: date,
        prices: stocksPrice,
        dividends: dividendsPaymentOnDate,
        transactions: transactions,
      };
    }

    console.log(this.historyData, 'HISTORY DATA');
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

      console.log(dividends, 'TICKKKKKER: ' + ticker);

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
