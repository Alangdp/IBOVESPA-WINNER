import { Bazin } from '../Entities/Bazin.js';
import { StockProps } from '../types/stock.types.js';
import { StockDataBase } from '../useCases/stockDataBase.js';
import Json from './Json.js';
import TickerFetcher from './Fetcher.js';
import { Pontuation } from '../Entities/Pontuation.js';
import { PontuationDataBase } from '../useCases/PontuationDatabase.js';

// FIXME ARRUMAR SOLID AQUI
// FIXME FUNÇÃO TEMPORARIA

type RankingSystyemProps = {
  tickers: string[];
};

interface Ranking {
  [ticker: string]: Pontuation;
}

const notAvailable: string[] = [];

class RankingSystyem {
  private tickers: string[];
  public ranking: Ranking;

  async execute() {
    for (const ticker of this.tickers) {
      try {
        console.log(ticker);
        const points = await PontuationDataBase.get({ ticker, type: 'BAZIN' });
        this.ranking[ticker] = points as Pontuation;
      } catch (error) {
        notAvailable.push(ticker);
        error;
        continue;
      }
    }
  }

  constructor({ tickers }: RankingSystyemProps) {
    this.tickers = tickers;
    this.ranking = {};
  }
}

async function updateRanking() {
  const tickers = await TickerFetcher.getAllTickers();
  const rankingSystyem = new RankingSystyem({ tickers });
  await rankingSystyem.execute();

  Json.saveJSONToFile(notAvailable, 'notAvailable.json');
}

updateRanking();
