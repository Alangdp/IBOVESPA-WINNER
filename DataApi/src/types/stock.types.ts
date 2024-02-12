import { StockProtocol } from '../interfaces/StockProtocol.type';
import { Dividend, LastDividendPayment } from './dividends.type';
import { IndicatorsData } from './indicators.type';

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

export type NetLiquid = {
  year: string;
  value: number;
};

export interface StockProps {
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
  indicators: IndicatorsData;

  // Graham variables

  netLiquid: NetLiquid[];
  passiveChart: PassiveChartReturn[];

  // Others

}

export interface PriceHistory {
  date: string;
  price: number;
}

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
    stock: StockProtocol;
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
