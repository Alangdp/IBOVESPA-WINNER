// FIXME ARRUMAR SOLID AQUI
export default class Chart {
    globalRentabily;
    globalStockQuantity;
    globalStockValue;
    globalDividendValue;
    globalTotalValue;
    individualRentability;
    constructor(requirements) {
        if (!requirements) {
            this.makeEmptyChart();
            return this;
        }
        this.globalRentabily = requirements.globalRentabily;
        this.globalStockQuantity = requirements.globalStockQuantity;
        this.globalStockValue = requirements.globalStockValue;
        this.globalDividendValue = requirements.globalDividendValue;
        this.globalTotalValue = requirements.globalTotalValue;
        this.individualRentability = requirements.individualRentability;
    }
    makeEmptyChart() {
        this.globalRentabily = 0;
        this.globalStockQuantity = 0;
        this.globalStockValue = 0;
        this.globalDividendValue = 0;
        this.globalTotalValue = 0;
        this.individualRentability = {};
    }
    createTickerOnChart(ticker) {
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
    buyUpdate(individualChart, ticker, quantity, valueInvested) {
        individualChart.quantity += quantity;
        individualChart.valueInvested += valueInvested;
        individualChart.medianPrice =
            individualChart.valueInvested / individualChart.quantity;
        this.individualRentability[ticker] = individualChart;
    }
    sellUpdate(individualChart, ticker, quantity, valueInvested) {
        const lastQuantity = individualChart.quantity;
        if (lastQuantity - quantity <= 0) {
            delete this.individualRentability[ticker];
            return;
        }
        individualChart.valueInvested -= valueInvested;
        individualChart.quantity = lastQuantity - quantity;
        this.individualRentability[ticker] = individualChart;
    }
    updateGlobals() {
        let globalStockQuantity = 0;
        let globalStockValue = 0;
        let globalDividendValue = 0;
        let globalTotalValue = 0;
        for (const ticker in this.individualRentability) {
            const stockData = this.individualRentability[ticker];
            const { quantity, valueInvested, dividendValue } = stockData;
            globalStockQuantity += quantity;
            globalStockValue += valueInvested;
            globalDividendValue += dividendValue;
            globalTotalValue += valueInvested + dividendValue;
        }
        this.globalStockQuantity = globalStockQuantity;
        this.globalStockValue = globalStockValue;
        this.globalDividendValue = globalDividendValue;
        this.globalTotalValue = globalTotalValue;
    }
    updateTickers(pricesOnDate, date) {
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
    updateDividends(dividends, date) {
        for (const ticker of Object.keys(dividends)) {
            const individualChart = this.individualRentability[ticker];
            if (individualChart === undefined)
                continue;
            const dividend = dividends[ticker];
            const dividendValue = individualChart.quantity * dividend.value;
            this.globalDividendValue += dividendValue;
            individualChart.dividendValue += dividendValue;
            individualChart.dividendPayments.push(date);
            this.individualRentability[ticker] = individualChart;
        }
    }
    updateChart(transactions, prices, dividends, date) {
        const transactionsLength = transactions.length;
        if (transactionsLength > 0) {
            for (const transaction of transactions) {
                const ticker = transaction.getTicker();
                const quantity = transaction.getQuantity();
                const price = transaction.getPrice();
                const valueInvested = quantity * price;
                let individualChart = this.individualRentability[ticker];
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
        this.updateGlobals();
        this.updateDividends(dividends, date);
        // FIXME - REFAZER ESSA PARTE
        // this.globalRentabily = this.globalTotalValue / this.globalStockValue;
        return this;
    }
    makePortfolioChart() {
        let totalWeigth = 0;
        let totalValue = 0;
        const portifolioChart = {};
        for (const ticker of Object.keys(this.individualRentability)) {
            const individualChart = this.individualRentability[ticker];
            const weigth = this.globalTotalValue / individualChart.valueTotal;
            const value = weigth * individualChart.rentability;
            portifolioChart[ticker] = weigth;
            totalWeigth += weigth;
            totalValue += value;
        }
        this.globalRentabily = totalValue * totalWeigth;
        return portifolioChart;
    }
    returnChart() {
        return {
            globalRentabily: this.globalRentabily,
            globalStockQuantity: this.globalStockQuantity,
            globalStockValue: this.globalStockValue,
            globalDividendValue: this.globalDividendValue,
            globalTotalValue: this.globalTotalValue,
            individualRentability: this.individualRentability,
        };
    }
}