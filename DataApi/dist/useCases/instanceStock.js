import { Stock } from "../Entities/Stock.js";
import TickerFetcher from "../utils/Fetcher.js";
export class InstanceStock {
    static stock = null;
    tickerFetcher;
    props = {
        priceHistory: null,
        payout: null,
        dividendInfo: null,
        basicInfo: null,
        indicators: null,
        cashFlow: null,
        passiveChart: null,
    };
    constructor(tickerFetcher) {
        this.tickerFetcher = tickerFetcher;
    }
    static async execute(ticker) {
        const tickerFetcher = await new TickerFetcher(ticker).initialize();
        const instanceStock = new InstanceStock(tickerFetcher);
        await instanceStock.initialize();
        const stock = InstanceStock.stock;
        if (!stock)
            throw new Error('Error creating stock');
        return stock;
    }
    async initialize() {
        await this.getData();
        this.validate(this.props);
        InstanceStock.stock = await this.build();
    }
    async build() {
        const stockProps = this.makeStockProps();
        return new Stock(stockProps);
    }
    async getData() {
        this.props.basicInfo = await this.tickerFetcher.getBasicInfo();
        this.props.priceHistory = await this.tickerFetcher.getPrice();
        this.props.dividendInfo = await this.tickerFetcher.getDividendInfo();
        this.props.payout = await this.tickerFetcher.getPayout();
        this.props.indicators = await this.tickerFetcher.getIndicatorsInfo();
        this.props.cashFlow = await this.tickerFetcher.getCashFlow();
        this.props.passiveChart = await this.tickerFetcher.getPassiveChart();
    }
    makeStockProps() {
        const props = this.props;
        const basicInfo = props.basicInfo;
        const priceHistory = props.priceHistory;
        const indicators = props.indicators;
        const payout = props.payout;
        const dividendInfo = props.dividendInfo;
        const passiveChart = props.passiveChart;
        // GET NET LIQUID
        const netLiquidArray = this.getNetLiquid();
        // GET DIVIDENDS
        const { lastDividendsPerYear, lastDividendsYield } = this.getDividends();
        const stockProp = {
            ...basicInfo,
            indicators,
            ticker: basicInfo.ticker,
            name: basicInfo.name,
            activeValue: basicInfo.VPA * basicInfo.shareQuantity,
            actualPrice: basicInfo.price,
            priceHistory: priceHistory.priceVariation,
            shareQuantity: basicInfo.shareQuantity,
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
        return stockProp;
    }
    getNetLiquid() {
        const cashFlow = this.props.cashFlow;
        // ? Lucro Líquido
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
        return netLiquid;
    }
    getDividends() {
        const indicators = this.props.indicators;
        const dividendInfo = this.props.dividendInfo;
        const lastDividendsYield = [];
        // ? ULTIMOS DIVIDENDOS PAGOS
        for (const dividend of indicators.dy.olds) {
            if (lastDividendsYield.length === 10)
                break;
            const dyValue = Number(dividend.value);
            lastDividendsYield.push(dyValue);
        }
        // ? DIVIDENDOS POR ANO
        const lastDividendsPerYear = [];
        for (const dividend of dividendInfo?.lastDividendPaymentsYear.reverse()) {
            if (lastDividendsPerYear.length === 10)
                break;
            lastDividendsPerYear.push(dividend.value);
        }
        return { lastDividendsPerYear, lastDividendsYield };
    }
    validate(props) {
        if (!props.priceHistory)
            throw new Error('Error getting price history');
        if (!props.payout)
            throw new Error('Error getting payout');
        if (!props.dividendInfo)
            throw new Error('Error getting dividend info');
        if (!props.passiveChart)
            throw new Error('Error getting passive chart');
    }
}
