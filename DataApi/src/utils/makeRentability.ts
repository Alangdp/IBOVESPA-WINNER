import yahooFinance from 'yahoo-finance2';

import TickerFetcher from './getFuncions';

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

interface Stock {
  id: number;
  ticker: string;
  company_name: string;
  type: string;
  price: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

function makeRentabilityPerDay(transactions: Transaction[], stocks: Stock[]) {
  const chartData = {
    ticker: '',
    quantity: 0,
    price: 0,
    totalValue: 0,
    medianPrice: 0,
  };

  const rentabilityPerDay = transactions.map((transaction) => {
    const stock = stocks.find((stock) => stock.id === transaction.stock_id);

    if (!stock) return;

    if (transaction.type_code === 1) {
      chartData.ticker = stock.ticker;
      chartData.quantity += transaction.quantity;
      chartData.totalValue += transaction.quantity * transaction.price;
      chartData.medianPrice = chartData.totalValue / chartData.quantity;
    }

    if (transaction.type_code === 0) {
      chartData.ticker = stock.ticker;
      chartData.quantity -= transaction.quantity;
      chartData.totalValue -= transaction.quantity * transaction.price;
      chartData.medianPrice = chartData.totalValue / chartData.quantity;
    }

    const rentability = (
      ((stock.price - transaction.price) / transaction.price) *
      100
    ).toFixed(2);

    return {
      ...transaction,
      rentability,
      medianPrice: chartData.medianPrice,
    };
  });

  return { rentabilityPerDay, chartData };
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
    transaction_date: new Date('2023-11-01'),
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
    transaction_date: new Date('2023-11-6'),
    user_id: 1,
    stock_id: 1,
    type_code: 1,
    created_at: new Date('2021-11-6'),
    updated_at: new Date('2021-11-6'),
  },

  {
    ticker: 'BBAS3',
    quantity: 10,
    price: 60,
    type: 'buy',
    total_value: 600,
    broker_code: 1,
    transaction_date: new Date('2023-11-6'),
    user_id: 1,
    stock_id: 1,
    type_code: 0,
    created_at: new Date('2021-11-6'),
    updated_at: new Date('2021-11-6'),
  },

  {
    ticker: 'BBAS3',
    quantity: 5,
    price: 30,
    type: 'buy',
    total_value: 150,
    broker_code: 1,
    transaction_date: new Date('2023-11-01'),
    user_id: 1,
    stock_id: 1,
    type_code: 0,
    created_at: new Date('2023-11-01'),
    updated_at: new Date('2023-11-01'),
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

const stockList: Stock[] = [
  // BBAS3 LIST
  {
    id: 1,
    ticker: 'BBAS3',
    company_name: 'Banco do Brasil',
    type: 'stock',
    price: 60,
    image_url: 'https://storage.googleapis.com/iex/api/logos/BBAS.png',
    created_at: new Date('2021-01-01'),
    updated_at: new Date('2021-01-01'),
  },

  {
    id: 2,
    ticker: 'TAEE11',
    company_name: 'Taesa',
    type: 'stock',
    price: 30,
    image_url: 'https://storage.googleapis.com/iex/api/logos/TAEE.png',
    created_at: new Date('2021-01-01'),
    updated_at: new Date('2021-01-01'),
  },
];

async function deTesteDewssaMerda() {
  const rentabilityPerDay = makeRentabilityPerDay(transationList, stockList);
  console.log(rentabilityPerDay);
}

deTesteDewssaMerda();
