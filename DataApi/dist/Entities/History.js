import instanceStock from './instanceStock.js';
import Chart from './Chart.js';
import HistoryUtils from '../utils/HistoryUtils.js';
import Utilities from '../utils/Utilities.js';
import Database from '../utils/Stockdatabase.js';
import Json from '../utils/Json.js';
// METAS:
// 1 - IMPLEMENTAR DIVIDENDOS - COMPLETO - COMPLETO
// 2 - ATUALIZAR DADOS SECUNDARIOS DO CHART - COMPLETO
// globalRentabily: number;
// globalStockQuantity: number;
// globalStockValue: number;
// globalDividendValue: number;
// globalTotalValue: number;
//
// TODO: SISTEMA DE THREADS(OTIMIZAÇÃO) - https://stackoverflow.com/questions/25167590/one-thread-for-many-tasks-vs-many-threads-for-each-task-do-sleeping-threads-aft
class History {
    requirements;
    uniqueTickers;
    stockInfo;
    transactions;
    historyData;
    chart = new Chart(null);
    indexHistoryPrice;
    indexDividend;
    constructor(requirements, uniqueTickers) {
        this.requirements = requirements;
        this.uniqueTickers = uniqueTickers;
        this.stockInfo = requirements.stockInfo;
        this.transactions = requirements.transactions;
        this.historyData = {};
        let indexHistoryPrice = {};
        for (const ticker of this.uniqueTickers) {
            indexHistoryPrice = HistoryUtils.indexHistoryPrice(this.stockInfo[ticker].historyPrice, ticker, indexHistoryPrice);
        }
        let indexDividend = {};
        for (const ticker of this.uniqueTickers) {
            indexDividend = HistoryUtils.indexDividend(this.stockInfo[ticker].dividend, indexDividend);
        }
        this.indexHistoryPrice = indexHistoryPrice;
        this.indexDividend = indexDividend;
        this.constructHistory();
    }
    getDividendsOnDate(date) {
        let dividendsPaymentOnDate = {};
        if (this.indexDividend[date]) {
            const dividends = this.indexDividend[date];
            Object.keys(dividends).map((ticker) => {
                const dividend = {
                    date: '',
                    ticker: '',
                    value: 0,
                    type: '',
                };
                dividend.date = date;
                dividend.ticker = ticker;
                dividend.value = dividends[ticker].value;
                dividend.type = dividends[ticker].type;
                dividendsPaymentOnDate[ticker] = dividend;
            });
        }
        return dividendsPaymentOnDate;
    }
    getTransactionsOnDate(date) {
        return this.transactions.filter((transaction) => {
            if (transaction.transaction_date === date)
                return transaction.transaction_date;
        });
    }
    getStocksPriceOnDate(date) {
        const stockPrice = this.indexHistoryPrice[date];
        const result = {};
        Object.entries(stockPrice).forEach(([ticker, { price }]) => {
            result[ticker] = { price, ticker };
        });
        return result;
    }
    constructHistory() {
        const dates = Object.keys(this.indexHistoryPrice);
        for (const date of dates) {
            const dividends = this.getDividendsOnDate(date);
            const transactions = this.getTransactionsOnDate(date);
            const prices = this.getStocksPriceOnDate(date);
            const chart = this.chart.updateChart(transactions, prices, dividends, date);
            this.historyData[date] = {
                date,
                prices,
                dividends,
                transactions,
                chart: chart,
            };
            console.log(chart);
        }
        Json.saveJSONToFile(this.historyData, 'history.json');
    }
    static async instanceHistory(transactions) {
        const db = new Database('json/stocks.json');
        const dividends = [];
        const stockInfo = {};
        const allTickers = transactions.map((transaction) => transaction.ticker);
        const uniqueTickers = Utilities.uniqueElements(allTickers);
        for (const ticker of uniqueTickers) {
            let stock = db.find((stock) => stock.ticker === ticker);
            const milliseconds = new Date().getTime() - (stock?.instaceTime ?? 0);
            if (stock && Utilities.msToHours(milliseconds) < 1) {
                for (const dividend of stock.lastDividendsValue) {
                    dividends.push(HistoryUtils.convertLastDividendToDividend(dividend));
                }
                stockInfo[ticker] = {
                    stock: stock,
                    dividend: dividends,
                    historyPrice: stock.priceHistory,
                };
                continue;
            }
            db.deleteBy((stock) => stock.ticker === ticker, true);
            stock = await instanceStock(ticker);
            stock.lastDividendsValue.forEach((dividend) => dividends.push(HistoryUtils.convertLastDividendToDividend(dividend)));
            stockInfo[ticker] = {
                stock: stock,
                dividend: dividends,
                historyPrice: stock.priceHistory,
            };
            db.add(stock);
        }
        db.commit();
        return new History({ stockInfo, transactions }, uniqueTickers);
    }
}
