import { BazinMethod } from '../Entities/Bazin.js';
import instanceStock from '../Entities/instanceStock.js';
import { MacroInfo } from '../global/MacroInfo.js';
import { Pontuation } from '../types/Pontuation.type.js';
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
        const stock = await instanceStock(ticker);
        const bazin = new BazinMethod(stock);

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

async function t() {
  const tickers = (await MacroInfo.initialize()) as string[];

  const tes = new RankingSystyem({ tickers });
  await tes.execute();
}

t();
