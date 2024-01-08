import { index, last } from 'cheerio/lib/api/traversing';
import { Dividend, LastDividendPayment } from '../types/dividends.type';
import { val } from 'cheerio/lib/api/attributes';
import { StockInfo } from './History.type';
import { PriceHistory } from '../types/stock.types';
import { Transaction } from '../Entities/Transaction.js';

export class HistoryUtils {
  static convertLastDividendToDividend(
    lastDividendPayment: LastDividendPayment
  ): Dividend {
    const { dataCom, dataEx, dividendType, dividendTypeName, ticker, value } =
      lastDividendPayment;

    const dividend: Dividend = {
      date: dataEx,
      ticker: ticker,
      value: value,
      type: dividendType,
    };
    return dividend;
  }

  private static unifiedDates(stockInfo: StockInfo, uniqueTickers: string[]) {
    const dates: string[] = [];

    for (const ticker of uniqueTickers) {
      const stock = stockInfo[ticker].stock;
      for (const dividend of stock.lastDividendsValue) {
        dates.push(dividend.dataEx);
      }
    }

    const uniqueDates = Array.from(new Set(dates));
    return uniqueDates;
  }

  static unifiedDividends(stockInfo: StockInfo, uniqueTickers: string[]) {
    const dividendPayment: DividendPayment = {};
    const uniqueDates = this.unifiedDates(stockInfo, uniqueTickers);

    for (const date of uniqueDates) {
      for (const ticker of uniqueTickers) {
        console.log();
      }
    }
  }

  static dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const addZero = (value: number) => {
      return value < 10 ? '0' + value : value;
    };

    return `${addZero(day)}/${addZero(month + 1)}/${year}`;
  }

  static stringToDate(dataString: string): Date | null {
    const partes = dataString.split('/');

    if (partes.length !== 3) {
      console.error('Date format invalid, use: "dd/mm/yyyy".');
      return null;
    }

    const [day, month, year] = partes.map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null;
    }
    const date = new Date(year, month - 1, day);

    return date;
  }

  static formatPriceDate(date: string): string {
    try {
      const [day, month, year] = date.split('/');

      return `${day}/${month}/20${year.split(' ')[0]}`;
    } catch (error) {
      return '';
    }
  }

  static indexHistoryPrice(
    historyPrice: PriceHistory[],
    ticker: string,
    reusableObject: IndexHistoryPrice
  ) {
    for (const info of historyPrice) {
      const { date, price } = info;
      const formatedDate = HistoryUtils.formatPriceDate(date);

      if (!reusableObject[formatedDate]) {
        reusableObject[formatedDate] = {};
      }

      reusableObject[formatedDate][ticker] = {
        price: price,
      };
    }

    return reusableObject;
  }

  static indexDividend(dividends: Dividend[], reusableObject: IndexDividend) {
    for (const dividend of dividends) {
      const { date, ticker } = dividend;

      if (!reusableObject[date]) {
        reusableObject[date] = {};
      } else {
        if (!reusableObject[date][ticker]) {
          reusableObject[date][ticker] = dividend;
        }
      }

      if (!reusableObject[date][ticker]) {
        reusableObject[date][ticker] = dividend;
      } else {
        if (reusableObject[date][ticker].value < dividend.value) {
          reusableObject[date][ticker] = dividend;
        }
      }
    }

    return reusableObject;
  }
}

interface DividendPayment {
  [date: string]: {
    [ticker: string]: Dividend;
  };
}

export type IndexHistoryPrice = {
  [date: string]: {
    [ticker: string]: {
      price: number;
    };
  };
};

export type IndexDividend = {
  [date: string]: {
    [ticker: string]: Dividend;
  };
};
