export class Variable {
    ticker;
    name;
    activeValue;
    shareQuantity;
    actualPrice;
    priceHistory;
    instanceTime = new Date().getTime();
    marketValue;
    constructor(ticker, name, activeValue, shareQuantity, actualPrice, priceHistory) {
        this.ticker = ticker;
        this.name = name;
        this.activeValue = activeValue;
        this.shareQuantity = shareQuantity;
        this.actualPrice = actualPrice;
        this.priceHistory = priceHistory;
        this.ticker = ticker;
        this.name = name;
        this.priceHistory = priceHistory;
        this.actualPrice = actualPrice;
        this.marketValue = actualPrice * activeValue;
    }
    makeMedian(array) {
        const sortedArray = array.sort();
        const middleIndex = sortedArray.length / 2;
        if (sortedArray.length % 2 === 0) {
            return (sortedArray[middleIndex] + sortedArray[middleIndex - 1]) / 2;
        }
        return sortedArray[Math.floor(middleIndex)];
    }
    makeAverage(array) {
        return array.reduce((acc, curr) => acc + curr, 0) / array.length;
    }
}
