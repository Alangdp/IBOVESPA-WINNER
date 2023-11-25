import TickerFetcher from './getFuncions.js';
import Utilities from './Utilities.js';
import {
  Transaction,
  Stock,
  History,
  priceInfo,
  StockRentability,
  chartDataType,
} from '../types/get.js';

function findClosestDateKey(
  object: any,
  targetDate: string
): string | undefined {
  let closestDateKey: string | undefined;
  let smallestDifference: number | undefined;

  for (const dateKey in object) {
    const [dayA, monthA, yearA] = dateKey
      .split('/')
      .map((str) => parseInt(str, 10));
    const dateA = new Date(yearA, monthA - 1, dayA);
    dateA.setHours(0, 0, 0, 0);

    const [dayB, monthB, yearB] = targetDate
      .split('/')
      .map((str) => parseInt(str, 10));
    const dateB = new Date(yearB, monthB - 1, dayB);
    dateB.setHours(0, 0, 0, 0);

    const difference = Math.abs(dateA.getTime() - dateB.getTime());

    if (smallestDifference === undefined || difference < smallestDifference) {
      smallestDifference = difference;
      closestDateKey = dateKey;
    }
  }

  console.log(closestDateKey, 'CLOSEST DATE KEY');
  return closestDateKey;
}

const transationList: Transaction[] = [
  {
    ticker: 'BBAS3',
    quantity: 100,
    price: 30,
    type: 'buy',
    total_value: 3000,
    broker_code: 1,
    transaction_date: new Date('2023-11-15'),
    user_id: 1,
    stock_id: 1,
    type_code: 0,
  },

  {
    ticker: 'TAEE11',
    quantity: 10,
    price: 30,
    type: 'buy',
    total_value: 300,
    broker_code: 1,
    transaction_date: new Date('2023-11-15'),
    user_id: 1,
    stock_id: 1,
    type_code: 0,
  },

  {
    ticker: 'TAEE11',
    quantity: 10,
    price: 30,
    type: 'buy',
    total_value: 300,
    broker_code: 1,
    transaction_date: new Date('2023-11-15'),
    user_id: 1,
    stock_id: 1,
    type_code: 0,
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
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear() % 100;
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

function formatStringtoDate(dateEntry: string): Date {
  const parts = dateEntry.split(/[\s/:]/);

  const year = parseInt(parts[2]) + 2000;
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[0]);
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
        const DateFormat = formatStringtoDate(priceInfo.date);
        const date = priceInfo.date;
        const price = priceInfo.price;

        if (!history[ticker]) {
          history[ticker] = {};
        }

        if (!history[ticker][date]) {
          history[ticker][date] = {
            ticker: stock.ticker,
            chartData: undefined,
            date: DateFormat || undefined,
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
    // console.log(atualDate, 'ATUAL DATE');

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
        // console.log(history[ticker][outside], 'IMPORTANTE AKI');
      }
    } else if (transaction.type_code === 2) {
      history[ticker][atualDate].dividend = transaction.total_value;
    }
  }

  const chartData: chartDataType = {
    stocks: [],
    uniqueTickers: [],
    totalValue: 0,
  };
  for (const ticker in history) {
    for (const date in history[ticker]) {
      const transactions = history[ticker][date].transactionsPeriod;
      if (transactions !== undefined && transactions.length > 0) {
        for (const transaction of transactions) {
          const ticker: string = transaction.ticker;

          let stockRentability: StockRentability = {
            ticker: transaction.ticker,
            quantity: transaction.quantity,
            price: transaction.price,
            totalValue: transaction.total_value,
            medianPrice: 0,
            date: formatDateToString(transaction.transaction_date),
            totalCust: 0,
          };

          if (transaction.type_code === 0) {
            if (Utilities.existTickerInChart(chartData, ticker)) {
              let index = chartData.stocks.findIndex(
                (stock) => stock.ticker === ticker
              );

              chartData.stocks[index].quantity += transaction.quantity;
              chartData.stocks[index].totalCust += transaction.total_value;
              chartData.stocks[index].totalValue +=
                history[ticker][date].price * chartData.stocks[index].quantity;
              chartData.stocks[index].medianPrice =
                chartData.stocks[index].totalCust /
                chartData.stocks[index].quantity;
            } else {
              chartData.stocks.push(stockRentability);
              chartData.uniqueTickers.push(ticker);
            }
          }

          // se for venda de ação e a quantidade de acoes for igual a zero entao remove a ação do chartData
          if (transaction.type_code === 1) {
            let index = chartData.stocks.findIndex(
              (stock) => stock.ticker === ticker
            );

            if (index === -1) continue;
            chartData.stocks[index].quantity -= transaction.quantity;
            chartData.stocks[index].totalCust -= transaction.total_value;
            chartData.stocks[index].totalValue =
              history[ticker][date].price * chartData.stocks[index].quantity;
            chartData.stocks[index].medianPrice =
              chartData.stocks[index].totalCust /
              chartData.stocks[index].quantity;

            if (chartData.stocks[index].quantity === 0) {
              chartData.stocks.splice(index, 1);
              chartData.uniqueTickers.splice(index, 1);
            }
          }
        }
      }

      chartData.totalValue = chartData.stocks.reduce(
        (total, stock) => total + stock.totalValue,
        0
      );

      history[ticker][date].chartData = {
        stocks: [...chartData.stocks],
        uniqueTickers: [...chartData.uniqueTickers],
        totalValue: chartData.totalValue,
      };

      console.log(history[ticker][date], 'HISTORY TICKER DATE');
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
  // console.log(history);
}

teste();
