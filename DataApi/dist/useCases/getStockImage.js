import fs from 'fs';
import TickerFetcher from '../utils/Fetcher.js';
export class GetStockImage {
    ticker;
    tickerFetcher;
    constructor(ticker) {
        this.ticker = ticker;
        this.tickerFetcher = new TickerFetcher(ticker);
    }
    async execute() {
        await this.tickerFetcher.initialize();
        const stockQuery = await this.tickerFetcher.getImage();
        if (!stockQuery)
            return null;
        const stockId = stockQuery[0].parentId;
        return `https://statusinvest.com.br/img/company/avatar/${stockId}.jpg`;
    }
    async downloadImage() {
        const url = await this.execute();
        if (!url)
            return null;
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(`./assets/imgs/logos/${this.ticker}-logo.jpg`, buffer);
    }
    async readImage(ticker) {
        try {
            return fs.readFileSync(`./assets/imgs/logos/${ticker.toUpperCase()}-logo.png`);
        }
        catch (error) {
            return fs.readFileSync(`./assets/imgs/NO-IMAGE.png`);
        }
    }
}
