import { contains } from 'cheerio';
import { Bazin } from '../Entities/Bazin.js';
import { MacroInfo } from '../global/MacroInfo.js';
import { Pontuation } from '../Entities/Pontuation.js';
import { StockProps } from '../types/stock.types.js';
import { InstanceStock } from '../useCases/instanceStock.js';
import { StockDataBase } from '../useCases/stockDataBase.js';
import Json from './Json.js';
import TickerFetcher from './Fetcher.js';

// FIXME ARRUMAR SOLID AQUI
// FIXME FUNÇÃO TEMPORARIA

type RankingSystyemProps = {
  tickers: string[];
};

interface Ranking {
  [ticker: string]: {
    points: Pontuation;
  };
}

class RankingSystyem {
  private tickers: string[];
  private ranking: Ranking;

  async execute() {
    for (const ticker of this.tickers) {
      try {
        const stock: StockProps = await StockDataBase.getStock(ticker)
        const bazin = new Bazin(stock);

        console.log(ticker);

        this.ranking[ticker] = { points: bazin.makePoints(stock) };
      } catch (error) {
        continue;
      }
    }

    Json.saveJSONToFile(this.ranking, 'Ranking.json');
  }

  constructor({ tickers }: RankingSystyemProps) {
    this.tickers = tickers;
    this.ranking = {};
  }
}

const teste = async () => {
  const tickers = await TickerFetcher.getAllTickers()
  const ranking = new RankingSystyem({tickers});
  ranking.execute()
}

teste()