import { Variable } from './Variable.js';
export class Stock extends Variable {
    calculateRentability(actualPrice, referencePrice) {
        return ((actualPrice - referencePrice) / referencePrice) * 100;
    }
    // FIXME - Soluções temporárias
    lastDividendsAverage;
    dividendYield;
    grossDebt;
    patrimony;
    lastDividendsYieldYear;
    lastDividendsValueYear;
    lastDividendsValue;
    payout;
    actualDividendYield;
    netLiquid;
    passiveChart;
    indicators;
    constructor(stock) {
        super(stock.ticker, stock.name, stock.activeValue, stock.shareQuantity, stock.actualPrice, stock.priceHistory);
        this.indicators = stock.indicators;
        this.dividendYield = stock.dividendYield;
        this.grossDebt = stock.grossDebt;
        this.patrimony = stock.patrimony;
        this.payout = stock.payout;
        this.actualDividendYield = stock.actualDividendYield;
        this.lastDividendsYieldYear = stock.lastDividendsYieldYear;
        this.lastDividendsValueYear = stock.lastDividendsValueYear;
        this.lastDividendsValue = stock.lastDividendsValue;
        this.netLiquid = stock.netLiquid;
        this.passiveChart = stock.passiveChart;
    }
}
