import { Bazin } from '../Entities/Bazin.js';
import { MacroInfo } from '../global/MacroInfo.js';
import { Pontuation } from '../types/Pontuation.type.js';
import { InstanceStock } from '../useCases/instanceStock.js';
import Json from './Json.js';

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
        const stock = await InstanceStock.execute(ticker);
        const bazin = new Bazin(stock);

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
