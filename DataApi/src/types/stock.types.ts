import { LastDividendPayment } from './dividends.type';

interface PassiveChartReturn {
  year: number;
  totalAssets: number;
  totalLiabilities: number;
  currentAssets: number;
  nonCurrentAssets: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  shareholdersEquity: number;
}

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

interface PriceHistory {
  date: string;
  price: number;
}

type Pontuation = {
  [condition: string]: boolean | number;
};

type Header = {
  name: string;
  index: number;
  value: { [key: string]: number };
};

interface RootReport {
  data: Report[];
  success: boolean;
}

interface Report {
  year: number;
  rank: number;
  dataReferencia: string;
  tipo: string;
  especie: string;
  assunto: string;
  linkPdf: string;
  dataReferencia_F: string;
}

interface ReportReturn {
  year: string;
  rank: number;
  referenceDate: string;
  type: string;
  especie: string;
  assunt: string;
  linkPdf: string;
}

export {
  StockRequirements,
  PriceHistory,
  Pontuation,
  Header,
  NetLiquid,
  Indicators,
  PassiveChartReturn,
  RootReport,
  ReportReturn,
};
