interface DataReport {
  year: string;
}
interface Report {
  yearReport: string;
  date: string;
  type: string;
  subject: string;
  linkPDF: string;
}
interface ReportObject {
  reportType: string;
  species: string;
  year: string;
  referenceDate: string;
  subject: string;
  linkPdf: string;
}
interface Dividend {
  type: string;
  dataEx: string;
  dataCom: string;
  value: number;
}

interface DividendInfoReturn {
  dividends: Dividend[];
  bestPrice: {
    bazin: string;
    granham: number;
  };
}

interface priceInfo {
  date: string;
  price: number;
}

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
  created_at?: Date;
  updated_at?: Date;
}

interface History {
  [key: string]: {
    [key: string]: {
      ticker: string;
      date: Date;
      price: number;
      chartData?: chartDataType;
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
  stocks: StockRentability[];
  uniqueTickers: string[];
  totalValue: number;
}

interface StockRentability {
  totalCust: number;
  ticker: string;
  quantity: number;
  price: number;
  totalValue: number;
  medianPrice: number;
  rentability?: number;
  date: string;
}

export {
  DataReport,
  Report,
  ReportObject,
  Dividend,
  DividendInfoReturn,
  priceInfo,
  Transaction,
  History,
  Stock,
  chartDataType,
  StockRentability,
};
