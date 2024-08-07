import { LastDividendPayment, Dividend } from "./Dividend.type";
import { DreData } from "./Dre.type";
import { FinancialIndicators } from "./Indicators.type";
import { PassiveChartReturn } from "./PassiveChart.type";
import { VariableProps } from "./Variable.type";

export type NetLiquid = {
  year: string;
  value: number;
};

export interface StockProps extends VariableProps {
  // Abrangent Data

  segment: string;
  lpa: number;
  p_l: number;
  freeFloat: number;

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
  indicators: FinancialIndicators;

  // Graham variables

  netLiquid: NetLiquid[];
  passiveChart: PassiveChartReturn[];

  // Other

  dreData: DreData
  timestamp?: number;
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
