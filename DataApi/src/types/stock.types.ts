import { LastDividendPayment } from './dividends.type';
import { Stock } from '../Entities/Stock';
import { Dividend } from './dividends.type';

export interface PassiveChartReturn {
  year: number;
  totalAssets: number;
  totalLiabilities: number;
  currentAssets: number;
  nonCurrentAssets: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  shareholdersEquity: number;
}

export interface Indicators {
  dy: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };

  lpa: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };

  vpa: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };

  p_l: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };

  p_vp: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };

  roe: {
    actual: number;
    average: number;
    olds: IndicatorData[];
  };
}

export interface IndicatorData {
  [date: string]: {
    date: string;
    value: number;
  };
}

export type NetLiquid = {
  year: string;
  value: number;
};

export interface StockRequirements {
  // Variables from Stock

  ticker: string;
  name: string;
  activeValue: number;
  actualPrice: number;
  priceHistory: PriceHistory[];
  shareQuantity: number;

  // Bazin variables

  dividendYield: number;
  grossDebt: number;
  patrimony: number;
  payout: number;
  actualDividendYield: number;

  lastDividendsYieldYear: number[];
  lastDividendsValueYear: number[];
  lastDividendsValue: LastDividendPayment[];
  indicators: Indicators;

  // Graham variables

  netLiquid: NetLiquid[];
  passiveChart: PassiveChartReturn[];
}

export interface PriceHistory {
  date: string;
  price: number;
}

export type Pontuation = {
  [condition: string]: boolean | number;
};

export type CashFlowHeader = {
  name: string;
  index: number;
  value: { [key: string]: number };
};

export interface RootReport {
  data: Report[];
  success: boolean;
}

export interface Report {
  year: number;
  rank: number;
  dataReferencia: string;
  tipo: string;
  especie: string;
  assunto: string;
  linkPdf: string;
  dataReferencia_F: string;
}

export interface ReportReturn {
  year: string;
  rank: number;
  referenceDate: string;
  type: string;
  especie: string;
  assunt: string;
  linkPdf: string;
}

export interface StockInfo {
  [ticker: string]: {
    stock: Stock;
    dividend: Dividend[];
    historyPrice: PriceHistory[];
  };
}

export interface StockPrice {
  [ticker: string]: {
    ticker: string;
    price: number;
  };
}
