import { Stock } from './Stock.js';
import TickerFetcher from '../utils/Fetcher.js';
async function instanceStock(ticker) {
    const tickerFetcher = new TickerFetcher(ticker);
    await tickerFetcher.initialize();
    const basicInfo = await tickerFetcher.getBasicInfo();
    const priceHistory = await tickerFetcher.getPrice();
    const dividendInfo = await tickerFetcher.getDividendInfo();
    const payout = await tickerFetcher.getPayout();
    const indicators = await tickerFetcher.getIndicatorsInfo();
    const lastDividendsYield = [];
    const cashFlow = await tickerFetcher.getCashFlow();
    const passiveChart = await tickerFetcher.getPassiveChart();
    if (!priceHistory)
        throw new Error('Error getting price history');
    if (!payout)
        throw new Error('Error getting payout');
    if (!dividendInfo)
        throw new Error('Error getting dividend info');
    if (!passiveChart)
        throw new Error('Error getting passive chart');
    // Dividendos
    for (const dividend of indicators.dy.olds) {
        if (lastDividendsYield.length === 10)
            break;
        const dyValue = Number(dividend.value);
        lastDividendsYield.push(dyValue);
    }
    const lastDividendsPerYear = [];
    for (const dividend of dividendInfo?.lastDividendPaymentsYear.reverse()) {
        if (lastDividendsPerYear.length === 10)
            break;
        lastDividendsPerYear.push(dividend.value);
    }
    // Lucro Líquido
    const netLiquid = [];
    cashFlow?.forEach((cashFlow) => {
        netLiquid.push({
            year: cashFlow.name,
            value: cashFlow.value['LucroLiquidoExercicioConsolidado'],
        });
    });
    const netLiquidArray = Array.from(netLiquid);
    netLiquidArray.forEach((netLiquid, index) => {
        if (netLiquid.value === 0)
            netLiquidArray.splice(index, 1);
    });
    // Requirements
    const stockData = {
        indicators,
        ...basicInfo,
        activeValue: basicInfo.VPA * basicInfo.shareQuantity,
        actualPrice: basicInfo.price,
        priceHistory: priceHistory.priceVariation,
        dividendYield: basicInfo.dividendPorcent,
        patrimony: basicInfo.liquidPatrimony,
        payout: payout.actual / 100,
        actualDividendYield: lastDividendsYield[0] / 100,
        lastDividendsYieldYear: lastDividendsYield,
        lastDividendsValueYear: lastDividendsPerYear,
        lastDividendsValue: dividendInfo.lastDividendPayments,
        netLiquid: netLiquidArray,
        passiveChart: passiveChart,
    };
    return new Stock(stockData);
}
export default instanceStock;
