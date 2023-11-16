import TickerFetcher from './getFuncions.js';
import Utilities from './Utilities.js';

interface Transaction {
  ticker: string;
  quantity: number;
  price: number;
  type: string;
  total_value: number;
  broker_code: number;
  type_code: number;
  transaction_date: Date;
  user_id: number;
  stock_id: number;
  created_at: Date;
  updated_at: Date;
}

interface priceInfo {
  // date not a Date type
  date: string;
  price: number;
}

interface History {
  [key: string]: {
    [key: string]: {
      ticker: string;
      date: Date;
      price: number;
      transactionsPeriod?: Transaction[];
      dividend?: number;
    };
  };
}

interface Stock {
  id?: number;
  ticker: string;
  company_name: string;
  type?: string;
  price: number;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
  prices?: priceInfo[];
}

interface chartDataType {
  ticker: string;
  quantity: number;
  price: number;
  totalValue: number;
  medianPrice: number;
  rentability?: number;
  date: string;
}

async function makeRentabilityPerDay(transactions: Transaction[]) {}

function findClosestDateKey(
  object: any,
  targetDate: string
): string | undefined {
  let closestDateKey: string | undefined;
  let smallestDifference: number | undefined;

  for (const dateKey in object) {
    const dateA = new Date(object[dateKey].date);
    const dateB = new Date(targetDate);

    const difference = Math.abs(dateA.getTime() - dateB.getTime());

    if (smallestDifference === undefined || difference < smallestDifference) {
      smallestDifference = difference;
      closestDateKey = dateKey;
    }
  }

  return closestDateKey;
}

const transationList: Transaction[] = [
  // BBAS3 LIST
  {
    ticker: 'BBAS3',
    quantity: 10,
    price: 30,
    type: 'buy',
    total_value: 300,
    broker_code: 1,
    transaction_date: new Date('2023-10-01'),
    user_id: 1,
    stock_id: 1,
    type_code: 1,
    created_at: new Date('2023-11-01'),
    updated_at: new Date('2023-11-01'),
  },

  {
    ticker: 'BBAS3',
    quantity: 10,
    price: 60,
    type: 'buy',
    total_value: 600,
    broker_code: 1,
    transaction_date: new Date('2023-10-20'),
    user_id: 1,
    stock_id: 1,
    type_code: 1,
    created_at: new Date('2021-11-6'),
    updated_at: new Date('2021-11-6'),
  },

  {
    ticker: 'TAEE11',
    quantity: 10,
    price: 30,
    type: 'buy',
    total_value: 300,
    broker_code: 1,
    transaction_date: new Date('2023-11-01'),
    user_id: 1,
    stock_id: 1,
    type_code: 1,
    created_at: new Date('2023-11-01'),
    updated_at: new Date('2023-11-01'),
  },
];

const transactionTypes = {
  0: 'buy',
  1: 'sell',
  2: 'dividend',
};

function formatDateToString(date: Date): string {
  // Get date components
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // Months are zero-based
  const year: number = date.getFullYear() % 100; // Get the last two digits of the year
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Add leading zeros if necessary
  const FDay: string = day < 10 ? '0' + day : day.toString();
  const FMonth: string = month < 10 ? '0' + month : month.toString();
  const FYear: string = year < 10 ? '0' + year : year.toString();
  const FHours: string = hours < 10 ? '0' + hours : hours.toString();
  const FMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();

  // Return the F string
  return `${FDay}/${FMonth}/${FYear} 00:00`;
}

function formatPriceInfoDate(dateEntry: string): Date {
  const parts = dateEntry.split(/[\s/:]/);

  const year = parseInt(parts[2]) + 2000;
  const month = parseInt(parts[0]) - 1;
  const day = parseInt(parts[1]);
  const hours = parseInt(parts[3]);
  const minutes = parseInt(parts[4]);

  return new Date(year, month, day, hours, minutes);
}

async function getTransactionsInfo(): Promise<{
  stocks: Stock[];
  uniqueTickers: string[];
}> {
  const tickersData: Stock[] = [];

  const tickers = transationList.map((transaction) => transaction.ticker);
  const uniqueTickers = [...new Set(tickers)];

  for (const ticker of uniqueTickers) {
    const tickerFetcher = new TickerFetcher(ticker);
    await tickerFetcher.initialize();

    // Get Info
    const basicInfo = await tickerFetcher.getBasicInfo();
    const pricesInfo = await tickerFetcher.getPrice();

    const stock: Stock = {
      ticker: tickerFetcher.getTicker(),
      company_name: basicInfo.name,
      type: 'STOCK',
      price: basicInfo.price,
      image_url: basicInfo.image,
      prices: pricesInfo?.priceVariation,
    };

    tickersData.push(stock);
  }

  return { stocks: tickersData, uniqueTickers };
}

async function organizaLinhaDoTempo(
  data: Stock[],
  transactions: Transaction[],
  uniqueTickers: string[]
) {
  const history: History = {};

  for (const ticker of uniqueTickers) {
    history[ticker] = {};

    for (const stock of data) {
      if (stock.prices === undefined) continue;

      for (const priceInfo of stock.prices) {
        const DateFormat = formatPriceInfoDate(priceInfo.date);
        const date = priceInfo.date;
        const price = priceInfo.price;

        if (!history[ticker]) {
          history[ticker] = {};
        }

        if (!history[ticker][date]) {
          history[ticker][date] = {
            ticker: stock.ticker,
            date: DateFormat,
            price,
            transactionsPeriod: [],
            dividend: undefined,
          };
        }
      }
    }
  }

  for (const transaction of transactions) {
    let date = transaction.transaction_date;
    const ticker = transaction.ticker;

    const atualDate = formatDateToString(date);
    console.log(atualDate);

    if (transaction.type_code === 0 || transaction.type_code === 1) {
      let outside = findClosestDateKey(history[ticker], atualDate) || undefined;
      if (outside === undefined) continue;
      if (history[ticker][outside]?.transactionsPeriod) {
        if (history[ticker][outside]) {
          if (history[ticker][outside].transactionsPeriod) {
            history[ticker][outside].transactionsPeriod?.push(transaction);
          } else {
            history[ticker][outside].transactionsPeriod = [transaction];
          }
        }
        console.log(history[ticker][outside], 'IMPORTANTE AKI');
      }
    } else if (transaction.type_code === 2) {
      history[ticker][atualDate].dividend = transaction.total_value;
    }
  }

  return history;
}

async function teste() {
  const transactionsInfo = await getTransactionsInfo();
  const history = await organizaLinhaDoTempo(
    transactionsInfo.stocks,
    transationList,
    transactionsInfo.uniqueTickers
  );

  Utilities.saveJSONToFile(history, 'history.json');
  console.log(history);
}

teste();
