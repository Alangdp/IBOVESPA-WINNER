import { LastDividendPayment } from '../types/dividends.type';

interface Indicators {
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

interface IndicatorData {
  [date: string]: {
    date: string;
    value: number;
  };
}

type NetLiquid = {
  year: string;
  value: number;
};

interface StockRequirements {
  // Variables from Stock

  ticker: string;
  name: string;
  activeValue: number;
  actualPrice: number;
  history: History[];
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
}

interface History {
  [date: string]: {
    date: string;
    price: number;
  };
}

type Pontuation = {
  [condition: string]: boolean | number;
};

type Header = {
  name: string;
  index: number;
  value: { [key: string]: number };
};

export {
  StockRequirements,
  History,
  Pontuation,
  Header,
  NetLiquid,
  Indicators,
};
