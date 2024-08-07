export interface ChartProps {
  globalRentability: number;
  globalStockQuantity: number;
  globalStockValue: number;
  globalDividendValue: number;
  globalTotalValue: number;
  globalInvested: number;
  individualRentability: StockRentability;
  portifolio: ChartPortifolio
}

export interface ChartPortifolio {
  [ticker: string]: number;
}

export interface StockRentability {
  [ticker: string]: StockData;
}

export interface StockData {
  dividendValue: number;
  dividendPayments: DividendPayment[];
  medianPrice: number;
  rentability: number;
  quantity: number;
  valueTotal: number;
  valueInvested: number;
}

export interface DividendPayment {
  date: string,
  value: number
  unitaryValue: number
}


export const getEmptyChart = (): ChartProps => {
  return {
    globalRentability: 0,
    globalStockQuantity: 0,
    globalStockValue: 0,
    globalDividendValue: 0,
    globalTotalValue: 0,
    globalInvested: 0,
    individualRentability: {},
    portifolio: {}
  };
};