import fs from 'fs';

import { StockQuery } from '../types/QueryStock.type';
import TickerFetcher from '../utils/Fetcher.js';

interface StockImage {
  [ticker: string]: string;
}

export class GetStockImage {
  private ticker: string;
  private tickerFetcher: TickerFetcher;

  constructor(ticker: string) {
    this.ticker = ticker;
    this.tickerFetcher = new TickerFetcher(ticker);
  }

  async execute(): Promise<string | null> {
    await this.tickerFetcher.initialize();
    const stockQuery: StockQuery[] | null = await this.tickerFetcher.getImage();

    if (!stockQuery) return null;
    const stockId = stockQuery[0].parentId;

    return `https://statusinvest.com.br/img/company/avatar/${stockId}.jpg`;
  }

  async downloadImage() {
    const url = await this.execute();
    if (!url) return null;

    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(`./assets/imgs/logos/${this.ticker}-logo.jpg`, buffer);
  }

  async readImage(ticker: string) {
    try {
      return fs.readFileSync(
        `./assets/imgs/logos/${ticker.toUpperCase()}-logo.png`
      );
    } catch (error) {
      return fs.readFileSync(`./assets/imgs/NO-IMAGE.png`);
    }
  }
}