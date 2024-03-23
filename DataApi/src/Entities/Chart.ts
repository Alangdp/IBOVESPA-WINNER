import { ChartProtocol } from '../interfaces/ChartProtocol.type';
import {
  ChartConstructor,
  Chart as ChartModel,
  ChartPortifolio,
  StockData,
  StockRentability,
} from '../types/Chart.type';
import { DividendOnDate } from '../types/dividends.type';
import { StockPrice } from '../types/stock.types';
import { TransactionHistory } from '../interfaces/Transaction';

// FIXME ARRUMAR SOLID AQUI

export default class Chart implements ChartProtocol {
  public globalRentability!: number;
  public globalStockQuantity!: number;
  public globalStockValue!: number;
  public globalDividendValue!: number;
  public globalTotalValue!: number;
  public globalInvested!: number;
  public individualRentability!: StockRentability;

  constructor(requirements: ChartConstructor | null) {
    if (!requirements) {
      this.makeEmptyChart();
      return;
    }

    this.globalRentability = requirements.globalRentability;
    this.globalStockQuantity = requirements.globalStockQuantity;
    this.globalStockValue = requirements.globalStockValue;
    this.globalDividendValue = requirements.globalDividendValue;
    this.globalTotalValue = requirements.globalTotalValue;
    this.individualRentability = requirements.individualRentability;
  }

  makeEmptyChart() {
    this.globalRentability = 0;
    this.globalStockQuantity = 0;
    this.globalStockValue = 0;
    this.globalDividendValue = 0;
    this.globalTotalValue = 0;
    this.individualRentability = {};
  }

  createTickerOnChart(ticker: string): StockData {
    this.individualRentability[ticker] = {
      medianPrice: 0,
      rentability: 0,
      quantity: 0,
      valueTotal: 0,
      valueInvested: 0,
      dividendPayments: [],
      dividendValue: 0,
    };

    return this.individualRentability[ticker];
  }

  buyUpdate(
    individualChart: StockData,
    ticker: string,
    quantity: number,
    valueInvested: number
  ) {
    individualChart.quantity += quantity;
    individualChart.valueInvested += valueInvested;

    individualChart.medianPrice =
      individualChart.valueInvested / individualChart.quantity;
    this.individualRentability[ticker] = individualChart;
  }

  sellUpdate(
    individualChart: StockData,
    ticker: string,
    quantity: number,
    valueInvested: number
  ) {
    const lastQuantity = individualChart.quantity;
    if (lastQuantity - quantity <= 0) {
      delete this.individualRentability[ticker];
      return;
    }

    individualChart.valueInvested -= valueInvested;
    individualChart.quantity = lastQuantity - quantity;

    this.individualRentability[ticker] = individualChart;
  }

  updateGlobals(prices: StockPrice) {
    let globalStockQuantity = 0;
    let globalStockValue = 0;
    let globalDividendValue = 0;
    let globalTotalValue = 0;
    let globalInvested = 0;

    for (const ticker in this.individualRentability) {
      const stockData = this.individualRentability[ticker];
      const { quantity, valueInvested, dividendValue } = stockData;

      globalStockQuantity += quantity;
      globalStockValue += valueInvested;
      globalDividendValue += dividendValue;
      globalTotalValue += (prices[ticker].price * quantity) + dividendValue
      globalInvested += valueInvested

    }

    this.globalStockQuantity = globalStockQuantity;
    this.globalStockValue = globalStockValue;
    this.globalDividendValue = globalDividendValue;
    this.globalTotalValue = globalTotalValue;
    this.globalInvested = globalInvested;
  }

  updateTickers(pricesOnDate: StockPrice, date: string) {
    for (const ticker in this.individualRentability) {
      const individualChart = this.individualRentability[ticker];
      const stockData = this.individualRentability[ticker];
      const { medianPrice } = individualChart;
      const actualPrice = pricesOnDate[ticker].price;
      const { quantity } = stockData;

      stockData.valueTotal = quantity * actualPrice;
      stockData.rentability = (actualPrice - medianPrice) / medianPrice;
      this.individualRentability[ticker] = stockData;
    }
  }

  updateDividends(dividends: DividendOnDate, date: string) {
    for (const ticker of Object.keys(dividends)) {
      const individualChart = this.individualRentability[ticker];
      if (individualChart === undefined) continue;
      const dividend = dividends[ticker];

      const dividendValue = individualChart.quantity * dividend.value;
      this.globalDividendValue += dividendValue;

      individualChart.dividendValue += dividendValue;
      individualChart.dividendPayments.push(date);

      this.individualRentability[ticker] = individualChart;
    }
  }

  updateChart(
    transactions: TransactionHistory[],
    prices: StockPrice,
    dividends: DividendOnDate,
    date: string
  ): this {
    const transactionsLength = transactions.length;
    if (transactionsLength > 0) {
      for (const transaction of transactions) {
        const ticker = transaction.getTicker();
        const quantity = transaction.getQuantity();
        const price = transaction.getPrice();
        const valueInvested = quantity * price;
        let individualChart: StockData = this.individualRentability[ticker];

        if (!individualChart)
          individualChart = this.createTickerOnChart(ticker);

        if (transaction.getType() === 'BUY') {
          this.buyUpdate(individualChart, ticker, quantity, valueInvested);
        }

        if (transaction.getType() === 'SELL') {
          this.sellUpdate(individualChart, ticker, quantity, valueInvested);
        }
      }
    }

    this.updateTickers(prices, date);
    this.updateGlobals(prices);
    this.updateDividends(dividends, date);
    this.makePortfolioChart();

    // FIXME - REFAZER ESSA PARTE
    // this.globalRentabily = this.globalTotalValue / this.globalStockValue;

    return this;
  }

  makePortfolioChart() {
    let totalWeigth = 0;
    let totalValue = 0;

    const portifolioChart: ChartPortifolio = {};

    for (const ticker of Object.keys(this.individualRentability)) {
      const individualChart = this.individualRentability[ticker];

      const weigth = this.globalTotalValue / individualChart.valueTotal;
      const value = weigth * individualChart.rentability;

      portifolioChart[ticker] = weigth;

      totalWeigth += weigth;
      totalValue += value;
    }

    console.log(totalWeigth, totalValue, 'Indicadores de Peso')

    this.globalRentability = totalValue * totalWeigth + 1;

    return portifolioChart;
  }

  returnChart(): ChartModel {
    return {
      globalRentability: this.globalRentability,
      globalStockQuantity: this.globalStockQuantity,
      globalStockValue: this.globalStockValue,
      globalDividendValue: this.globalDividendValue,
      globalTotalValue: this.globalTotalValue,
      individualRentability: this.individualRentability,
    };
  }
}
