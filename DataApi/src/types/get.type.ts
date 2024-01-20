interface AxiosOptions {
  method: 'POST' | 'GET';
  url: string;
  data?: object | string;
  params?: object;
  headers: {
    'Content-Type': string;
    cookie: string;
    'user-agent': string;
  };
}

interface Dividend {
  type: string;
  dataEx: string;
  dataCom: string;
  value: number;
}

interface Dividends {
  lastDividends: Dividend[];
  dividiendPorcentInDecimal: number;
  dividendPorcent: number;
}

interface Series {
  percentual: number[];
  proventos: number[];
  lucroLiquido: number[];
}

interface Chart {
  categoryUnique: boolean;
  category: string[];
  series: Series;
}

interface PayoutReturn {
  actual: number;
  average: number;
  minValue: number;
  maxValue: number;
  currency?: String;
  chart: Chart;
}

interface PassiveChartObject {
  year: number;
  ativoTotal: number;
  passivoTotal: number;
  ativoCirculante: number;
  ativoNaoCirculante: number;
  passivoCirculante: number;
  passivoNaoCirculante: number;
  patrimonioLiquido: number;
}

export { AxiosOptions, Dividends, Dividend, PayoutReturn, PassiveChartObject };
