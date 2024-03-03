import { VariableProps } from '../interfaces/Variable.type';
import { PassiveChartReturn } from './PassiveChart.type';
import { Dividend, LastDividendPayment } from './dividends.type';
import { IndicatorsData } from './indicators.type';


export type NetLiquid = {
  year: string;
  value: number;
};

export interface StockProps extends VariableProps {
  // Abrangent Data

  segment: string;

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

  // Other
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

export interface StockInfo {
  [ticker: string]: {
    stock: StockProps;
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
