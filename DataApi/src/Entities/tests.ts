import { StockRequirements } from '../types/stock.types';
import { Stock } from './Stock.js';
import { BazinMethod } from './Bazin.js';
import { Header, NetLiquid } from '../types/stock.types';

import TickerFetcher from '../utils/getFuncions.js';
import { GranhamMethod } from './Graham.js';

async function instanceStock(ticker: string): Promise<Stock> {
  const tickerFetcher = new TickerFetcher(ticker);
  await tickerFetcher.initialize();

  const basicInfo = await tickerFetcher.getBasicInfo();
  const priceHistory = await tickerFetcher.getPrice();
  const dividendInfo = await tickerFetcher.getDividendInfo();
  const payout = await tickerFetcher.getPayout();
  const indicators = await tickerFetcher.getIndicatorsInfo();
  const lastDividendsYield: number[] = [];
  const lastDividendsValue: number[] = [];
  const cashFlow = await tickerFetcher.getCashFlow();
  const passiveChart = await tickerFetcher.getPassiveChart();

  if (!priceHistory) throw new Error('Error getting price history');
  if (!payout) throw new Error('Error getting payout');
  if (!dividendInfo) throw new Error('Error getting dividend info');
  if (!passiveChart) throw new Error('Error getting passive chart');

  // Dividendos

  for (const dividend of indicators.dy.olds) {
    if (lastDividendsYield.length === 10) break;
    const dyValue = Number(dividend.value);
    lastDividendsYield.push(dyValue);
  }

  const lastDividendsPerYear: number[] = [];
  for (const dividend of dividendInfo?.lastDividendPaymentsYear.reverse()) {
    if (lastDividendsPerYear.length === 10) break;
    lastDividendsPerYear.push(dividend.value);
  }

  const netLiquid: NetLiquid[] = [];
  cashFlow?.forEach((cashFlow: Header) => {
    netLiquid.push({
      year: cashFlow.name,
      value: cashFlow.value['LucroLiquidoExercicioConsolidado'],
    });
  });

  const netLiquidArray = Array.from(netLiquid);
  netLiquidArray.forEach((netLiquid, index) => {
    if (netLiquid.value === 0) netLiquidArray.splice(index, 1);
  });

  const stockData: StockRequirements = {
    indicators,

    shareQuantity: basicInfo.shareQuantity,
    ticker: tickerFetcher.ticker,
    name: basicInfo.name,
    activeValue: basicInfo.VPA * basicInfo.shareQuantity,
    actualPrice: basicInfo.price,
    history: priceHistory.priceVariation,
    dividendYield: basicInfo.dividendPorcent,
    grossDebt: basicInfo.grossDebt,
    patrimony: basicInfo.liquidPatrimony,

    lastDividendsYieldYear: lastDividendsYield,
    lastDividendsValueYear: lastDividendsPerYear,
    lastDividendsValue: dividendInfo.lastDividendPayments,

    payout: payout.actual / 100,
    actualDividendYield: lastDividendsYield[0] / 100,
    netLiquid: netLiquidArray,
    passiveChart,
  };

  const stock = new Stock(stockData);

  return stock;
}

instanceStock('BBAS3');
